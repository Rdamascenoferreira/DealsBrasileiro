import React, { useState } from 'react'

export default function SearchPage() {
  const [q, setQ] = useState('')
  const [results, setResults] = useState<any>(null)

  async function doSearch() {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    setResults(data)
  }

  return (
    <div style={{ padding: 24, background: '#0b1020', minHeight: '100vh', color: '#e6eef8' }}>
      <h1>Buscar jogos</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nome do jogo" />
        <button onClick={doSearch}>Buscar</button>
      </div>
      <pre style={{ marginTop: 16 }}>{JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}
