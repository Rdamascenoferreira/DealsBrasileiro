import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import GameCard from '../components/GameCard'

export default function SearchPage() {
  const [results, setResults] = useState<any[]>([])

  async function doSearch(q?: string) {
    if (!q) return
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    const items = (data.data?.list || []).map((i: any) => ({ title: i.title || i.name, slug: i.id || i.url }))
    setResults(items)
  }

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
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
