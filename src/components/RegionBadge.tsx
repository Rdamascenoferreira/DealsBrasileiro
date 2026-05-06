import React from 'react'
import { normalizeRegion } from '../lib/region'

export default function RegionBadge({ region }: { region?: string | null }) {
  const r = normalizeRegion(region)
  const color = r === 'GLOBAL' ? '#22c55e' : r === 'BRASIL' ? '#06b6d4' : r === 'LATAM' ? '#7c3aed' : '#9ca3af'
  return (
    <span style={{ padding: '4px 8px', background: color, borderRadius: 6, color: '#fff', fontSize: 12 }}>
      {r}
    </span>
  )
}
