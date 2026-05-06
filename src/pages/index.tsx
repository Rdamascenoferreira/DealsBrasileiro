import React from 'react'

export default function Home() {
  return (
    <div style={{ padding: 24, background: '#0b1020', minHeight: '100vh', color: '#e6eef8' }}>
      <header>
        <h1 style={{ fontSize: 28 }}>GameDeals BR</h1>
        <p>Compare preços de jogos digitais com ativação Global, LATAM e Brasil</p>
      </header>

      <main style={{ marginTop: 24 }}>
        <div>
          <input placeholder="Buscar jogos..." style={{ padding: 12, width: '100%', borderRadius: 8 }} />
        </div>

        <section style={{ marginTop: 24 }}>
          <h2>Menores preços de hoje</h2>
          <p>Exemplo de cards de ofertas</p>
        </section>
      </main>
    </div>
  )
}
