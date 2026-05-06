import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/db'
import { cacheGet, cacheSet } from '../../../../services/cache'
import { convertToBRL } from '../../../../lib/exchange'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slugParam = req.query.slug
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam
  if (!slug) return res.status(400).json({ error: 'slug required' })

  const cacheKey = `game:offers:${slug}`
  try {
    const cached = await cacheGet<any>(cacheKey)
    if (cached) return res.status(200).json({ source: 'cache', data: cached })

    const game = await prisma.game.findUnique({
      where: { slug },
      include: { offers: { include: { store: true } } },
    })
    if (!game) return res.status(404).json({ error: 'game not found' })

    const updatedOffers = await Promise.all(
      game.offers.map(async (offer) => {
        let converted = offer.convertedPriceBRL ?? null
        try {
          if (converted == null) {
            converted = await convertToBRL(offer.price, offer.currency)
            await prisma.offer.update({ where: { id: offer.id }, data: { convertedPriceBRL: converted, lastCheckedAt: new Date() } })
          } else {
            // update lastCheckedAt only
            await prisma.offer.update({ where: { id: offer.id }, data: { lastCheckedAt: new Date() } })
          }
        } catch (err) {
          console.warn('offer update failed', err)
        }

        try {
          await prisma.priceHistory.create({
            data: {
              gameId: offer.gameId,
              storeId: offer.storeId,
              price: offer.price,
              currency: offer.currency,
              convertedPriceBRL: converted,
              activationRegion: offer.activationRegion,
              checkedAt: new Date(),
            },
          })
        } catch (err) {
          console.warn('priceHistory create failed', err)
        }

        return { ...offer, convertedPriceBRL: converted }
      })
    )

    await cacheSet(cacheKey, updatedOffers, 60)
    return res.status(200).json({ source: 'db', data: updatedOffers })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'failed to fetch offers' })
  }
}
