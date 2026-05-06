import React from 'react'
import { GetServerSideProps } from 'next'
import { prisma } from '../../lib/db'

type Props = {
  game: any | null
}

export default function GamePage({ game }: Props) {
  if (!game) return <div>Jogo não encontrado</div>
  return (
    <div style={{ padding: 24, background: '#0b1020', minHeight: '100vh', color: '#e6eef8' }}>
      <h1>{game.title}</h1>
      <p>Plataformas: {game.platforms.join(', ')}</p>
      <section>
        <h2>Ofertas</h2>
        <p>Lista de ofertas será mostrada aqui.</p>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug as string
  const game = await prisma.game.findUnique({ where: { slug } })
  return { props: { game: game ? JSON.parse(JSON.stringify(game)) : null } }
}
