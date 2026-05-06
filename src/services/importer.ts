import { prisma } from '../lib/db'
import { importFromCheapShark, NormalizedOffer } from './adapters/cheapsharkAdapter'
import { normalizeRegion } from '../lib/region'
import { convertToBRL } from '../lib/exchange'

export async function importOffersForTitle(title: string) {
  const normalized: NormalizedOffer[] = await importFromCheapShark(title)
  const results: any[] = []
  for (const n of normalized) {
    // upsert store
    const store = await prisma.store.upsert({ where: { slug: n.store.slug }, update: {}, create: { name: n.store.name, slug: n.store.slug, websiteUrl: n.store.websiteUrl, type: 'KEYSHOP', trustScore: 60 } })

    // upsert game
    const slug = n.game.slug || n.game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const game = await prisma.game.upsert({ where: { slug }, update: {}, create: { externalId: n.game.externalId, slug, title: n.game.title, platforms: n.game.platforms || ['PC'], genres: [] } })

    const converted = await convertToBRL(n.price, n.currency)

    const offer = await prisma.offer.create({ data: {
      gameId: game.id,
      storeId: store.id,
      title: n.game.title,
      price: n.price,
      originalPrice: n.originalPrice,
      currency: n.currency,
      convertedPriceBRL: converted,
      discountPercent: n.discountPercent ? Math.round(n.discountPercent) : undefined,
      activationRegion: normalizeRegion(n.activationRegion) as any,
      drm: n.drm,
      offerUrl: n.offerUrl,
      affiliateUrl: n.affiliateUrl,
      sourceApi: n.sourceApi,
    }})

    // save history
    await prisma.priceHistory.create({ data: { gameId: game.id, storeId: store.id, price: n.price, currency: n.currency, convertedPriceBRL: converted, activationRegion: normalizeRegion(n.activationRegion) as any } })

    results.push({ game, store, offer })
  }

  return results
}
