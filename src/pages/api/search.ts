import type { NextApiRequest, NextApiResponse } from 'next'
import { searchGameItad } from '../../services/itad'
import { cacheGet, cacheSet } from '../../services/cache'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q
  if (!q) return res.status(400).json({ error: 'q required' })
  const cacheKey = `search:${q}`
  const cached = await cacheGet(cacheKey)
  if (cached) return res.status(200).json({ source: 'cache', data: cached })
  try {
    const data = await searchGameItad(q)
    await cacheSet(cacheKey, data, 60 * 5)
    return res.status(200).json({ source: 'itad', data })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: 'search failed' })
  }
}
