import type { NextApiRequest, NextApiResponse } from 'next'
import { importOffersForTitle } from '../../../services/importer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q
  if (!q) return res.status(400).json({ error: 'q query required' })
  try {
    const r = await importOffersForTitle(q)
    return res.status(200).json({ imported: r.length })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'import failed' })
  }
}
