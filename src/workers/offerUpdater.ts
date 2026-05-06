import cron from 'node-cron'
import { prisma } from '../lib/db'
import { convertToBRL } from '../lib/exchange'

// Runs every 30 minutes to update offers
cron.schedule('*/30 * * * *', async () => {
  try {
    console.log('[offerUpdater] Starting update cycle')
    const offers = await prisma.offer.findMany({ where: { isActive: true }, take: 200 })
    for (const offer of offers) {
      try {
        const converted = await convertToBRL(offer.price, offer.currency)
        await prisma.offer.update({ where: { id: offer.id }, data: { convertedPriceBRL: converted, lastCheckedAt: new Date() } })
        await prisma.priceHistory.create({ data: { gameId: offer.gameId, storeId: offer.storeId, price: offer.price, currency: offer.currency, convertedPriceBRL: converted, activationRegion: offer.activationRegion } })
      } catch (err) {
        console.warn('[offerUpdater] failed update for offer', offer.id, err)
      }
    }
    console.log('[offerUpdater] Cycle finished')
  } catch (err) {
    console.error('[offerUpdater] failed', err)
  }
})

console.log('Offer updater worker started')
