import React, { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch?: (q: string) => void }) {
  const [q, setQ] = useState('')

  function submit(e?: React.FormEvent) {
    e?.preventDefault()
    onSearch?.(q)
  }

  return (
    <form onSubmit={submit} className="w-full flex gap-2">
      <input
        className="flex-1 px-4 py-2 rounded bg-slate-800 text-white"
        placeholder="Buscar jogos, ex: Cyberpunk 2077"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="px-4 py-2 rounded bg-emerald-500 text-black" onClick={submit} type="submit">
        Buscar
      </button>
    </form>
  )
}
