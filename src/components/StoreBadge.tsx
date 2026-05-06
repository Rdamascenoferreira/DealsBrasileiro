import React from 'react'

export default function StoreBadge({ store }: { store: { name?: string; type?: string } }) {
  const type = store?.type || 'KEYSHOP'
  const color = type === 'OFFICIAL' ? '#10b981' : type === 'MARKETPLACE' ? '#f59e0b' : '#3b82f6'
  return (
    <span style={{ padding: '4px 8px', background: color, borderRadius: 6, color: '#fff', fontSize: 12 }}>
      {store?.name ?? type}
    </span>
  )
}
