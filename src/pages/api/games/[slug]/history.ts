import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slugParam = req.query.slug
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam
  if (!slug) return res.status(400).json({ error: 'slug required' })

  try {
    const game = await prisma.game.findUnique({ where: { slug } })
    if (!game) return res.status(404).json({ error: 'game not found' })

    const history = await prisma.priceHistory.findMany({ where: { gameId: game.id }, orderBy: { checkedAt: 'asc' }, take: 1000 })
    return res.status(200).json({ data: history })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'failed to fetch history' })
  }
}
