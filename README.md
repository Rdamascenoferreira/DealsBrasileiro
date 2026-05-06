# GameDeals BR

Projeto MVP inspirado em comparação de preços de jogos digitais com foco no Brasil e América Latina.

Stack sugerida:
- Next.js + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Redis

Como rodar (local):

1. Instale dependências: `npm install`
2. Configure `.env` baseado em `.env.example`.
3. Gere o cliente Prisma: `npm run prisma:generate`
4. Rode migrações: `npm run prisma:migrate`
5. Rode seed: `npm run seed`
6. Rode o app: `npm run dev`
