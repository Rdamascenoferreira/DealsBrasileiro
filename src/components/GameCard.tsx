import React from 'react'
import RegionBadge from './RegionBadge'

export default function GameCard({ game }: { game: any }) {
  return (
    <div className="bg-slate-900 rounded p-4">
      <div className="flex gap-4">
        {game.coverImage ? <img src={game.coverImage} alt={game.title} className="w-20 h-28 object-cover rounded" /> : <div className="w-20 h-28 bg-slate-700 rounded" />}
        <div>
          <h3 className="text-lg font-bold">{game.title}</h3>
          <p className="text-sm text-slate-400">{game.platforms?.join(', ')}</p>
          <div className="mt-2">
            <RegionBadge region={game.activationRegion} />
          </div>
        </div>
      </div>
    </div>
  )
}
