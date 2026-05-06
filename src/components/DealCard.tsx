import React from 'react'
import StoreBadge from './StoreBadge'

export default function DealCard({ deal }: { deal: any }) {
  return (
    <div className="bg-slate-900 rounded p-4 flex justify-between items-center">
      <div>
        <div className="text-sm text-slate-400">{deal.store?.name}</div>
        <div className="font-bold">{deal.title}</div>
        <div className="text-sm">{deal.price} {deal.currency} (~R$ {deal.convertedPriceBRL?.toFixed(2) ?? '—'})</div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <StoreBadge store={deal.store} />
        <a className="text-emerald-400" href={deal.offerUrl} target="_blank" rel="noreferrer">Ir para a loja</a>
      </div>
    </div>
  )
}
