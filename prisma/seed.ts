import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  const store1 = await prisma.store.upsert({
    where: { slug: 'epic-games' },
    update: {},
    create: {
      name: 'Epic Games Store',
      slug: 'epic-games',
      websiteUrl: 'https://www.epicgames.com',
      type: 'OFFICIAL',
      trustScore: 90,
      supportsAffiliate: false,
    },
  })

  const store2 = await prisma.store.upsert({
    where: { slug: 'green-man-gaming' },
    update: {},
    create: {
      name: 'Green Man Gaming',
      slug: 'green-man-gaming',
      websiteUrl: 'https://www.greenmangaming.com',
      type: 'KEYSHOP',
      trustScore: 70,
      supportsAffiliate: true,
    },
  })

  const game1 = await prisma.game.upsert({
    where: { slug: 'cyberpunk-2077' },
    update: {},
    create: {
      externalId: 'cyberpunk-2077',
      slug: 'cyberpunk-2077',
      title: 'Cyberpunk 2077',
      description: 'Open-world RPG',
      platforms: ['PC'],
      genres: ['RPG', 'Open World'],
    },
  })

  await prisma.offer.upsert({
    where: { id: 'sample-offer-1' },
    update: {},
    create: {
      id: 'sample-offer-1',
      gameId: game1.id,
      storeId: store2.id,
      title: 'Cyberpunk 2077 - GMG',
      price: 19.99,
      originalPrice: 59.99,
      currency: 'USD',
      convertedPriceBRL: 100.0,
      discountPercent: 67,
      activationRegion: 'GLOBAL',
      drm: 'Steam',
      offerUrl: 'https://www.greenmangaming.com/sample',
      sourceApi: 'seed',
    },
  })

  console.log('Seeding finished')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
