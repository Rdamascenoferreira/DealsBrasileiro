export type Region =
  | 'GLOBAL'
  | 'BRASIL'
  | 'LATAM'
  | 'SOUTH_AMERICA'
  | 'REGION_LOCKED'
  | 'UNKNOWN'

export function normalizeRegion(input?: string | null): Region {
  if (!input) return 'UNKNOWN'
  const s = input.trim().toLowerCase()
  if (s === 'global' || s === 'worldwide' || s === 'world') return 'GLOBAL'
  if (s === 'brazil' || s === 'brasil') return 'BRASIL'
  if (s === 'latam' || s === 'latin america' || s === 'latinamerica') return 'LATAM'
  if (s === 'south america' || s === 'southamerica') return 'SOUTH_AMERICA'
  if (s.includes('region') && s.includes('locked')) return 'REGION_LOCKED'
  if (s === 'row') return 'GLOBAL'
  return 'UNKNOWN'
}
