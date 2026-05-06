import axios from 'axios'
import { CHEAPSHARK_BASE_URL } from '../env'

const BASE = CHEAPSHARK_BASE_URL || 'https://www.cheapshark.com/api/1.0'

let storeCache: Record<string, any> | null = null

async function getStores() {
  if (storeCache) return storeCache
  const res = await axios.get(`${BASE}/stores`)
  storeCache = (res.data || []).reduce((acc: any, s: any) => {
    acc[String(s.storeID)] = s
    return acc
  }, {})
  return storeCache
}

export async function searchGames(title: string) {
  const res = await axios.get(`${BASE}/games`, { params: { title, limit: 10 } })
  return res.data
}

export async function getDealsByGameId(gameId: string) {
  const res = await axios.get(`${BASE}/deals`, { params: { id: gameId } })
  return res.data
}

export type NormalizedOffer = {
  game: { externalId?: string; title: string; slug?: string; platforms?: string[]; coverImage?: string }
  store: { slug: string; name: string; type?: 'OFFICIAL' | 'MARKETPLACE' | 'KEYSHOP'; websiteUrl?: string }
  price: number
  originalPrice?: number
  currency: string
  discountPercent?: number
  activationRegion?: string
  drm?: string
  offerUrl: string
  affiliateUrl?: string
  sourceApi?: string
  sourceId?: string
}

export async function importFromCheapShark(title: string): Promise<NormalizedOffer[]> {
  const results = await searchGames(title)
  const stores = await getStores()
  const normalized: NormalizedOffer[] = []

  for (const g of results) {
    const gameId = g.gameID || g.external || g.cheapest || String(g.id || '')
    // fetch deals for this game
    try {
      const deals = await getDealsByGameId(gameId)
      for (const d of deals) {
        const storeInfo = stores[String(d.storeID)] || { storeName: `Store ${d.storeID}` }
        const storeSlug = `cheapshark-${d.storeID}`
        const titleName = d.title || g.title || title
        normalized.push({
          game: { externalId: `cheapshark:${gameId}`, title: titleName, slug: titleName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
          store: { slug: storeSlug, name: storeInfo.storeName || storeInfo.storeName, type: 'KEYSHOP', websiteUrl: `https://www.cheapshark.com` },
          price: parseFloat(d.price),
          originalPrice: d.retailPrice ? parseFloat(d.retailPrice) : undefined,
          currency: 'USD',
          discountPercent: d.savings ? Math.round(Number(d.savings)) : undefined,
          activationRegion: 'GLOBAL',
          drm: d.steamAppID ? 'Steam' : undefined,
          offerUrl: `https://www.cheapshark.com/redirect?dealID=${d.dealID}`,
          affiliateUrl: undefined,
          sourceApi: 'cheapshark',
          sourceId: String(d.dealID),
        })
      }
    } catch (err) {
      // continue on errors for individual games
      console.warn('cheapshark: failed to fetch deals for', gameId, err)
    }
  }

  return normalized
}
