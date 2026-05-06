import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import GameCard from '../components/GameCard'

export default function Home() {
  const [results, setResults] = useState<any[]>([])

  async function doSearch(q?: string) {
    if (!q) return
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    // minimal mapping for now
    const items = (data.data?.list || []).map((i: any) => ({ title: i.title || i.name, slug: i.id || i.url }))
    setResults(items)
  }

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">GameDeals BR</h1>
        <p className="text-slate-400">Compare preços de jogos digitais com ativação Global, LATAM e Brasil</p>
      </header>

      <main className="max-w-4xl mx-auto mt-8">
        <SearchBar onSearch={doSearch} />

        <section className="mt-8 grid grid-cols-1 gap-4">
          {results.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </section>
      </main>
    </div>
  )
}
