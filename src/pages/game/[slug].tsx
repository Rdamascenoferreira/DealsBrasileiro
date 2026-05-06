import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { prisma } from '../../lib/db'
import StoreBadge from '../../components/StoreBadge'

type Props = {
  game: any | null
}

export default function GamePage({ game }: Props) {
  const [offers, setOffers] = useState<any[] | null>(null)

  useEffect(() => {
    if (!game) return
    fetch(`/api/games/${game.slug}/offers`)
      .then((r) => r.json())
      .then((d) => setOffers(d.data))
      .catch((e) => console.error(e))
  }, [game])

  if (!game) return <div>Jogo não encontrado</div>
  return (
    <div style={{ padding: 24, background: '#0b1020', minHeight: '100vh', color: '#e6eef8' }}>
      <h1>{game.title}</h1>
      <p>Plataformas: {game.platforms.join(', ')}</p>
      <section>
        <h2>Ofertas</h2>
        {!offers && <p>Carregando ofertas...</p>}
        {offers && offers.length === 0 && <p>Nenhuma oferta encontrada.</p>}
        {offers && offers.map((o) => (
          <div key={o.id} style={{ padding: 12, border: '1px solid #172554', borderRadius: 8, marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{o.title}</strong>
                <div>Preço: {o.price} {o.currency} (~R$ {o.convertedPriceBRL?.toFixed(2) ?? '—'})</div>
                <div>Desconto: {o.discountPercent ?? '—'}%</div>
              </div>
              <div>
                <StoreBadge store={o.store} />
                <div style={{ marginTop: 8 }}>
                  <a href={o.offerUrl} target="_blank" rel="noreferrer">
                    Ir para a loja
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug as string
  const game = await prisma.game.findUnique({ where: { slug } })
  return { props: { game: game ? JSON.parse(JSON.stringify(game)) : null } }
}
