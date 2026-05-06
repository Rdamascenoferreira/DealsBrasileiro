import Redis from 'ioredis'

const url = process.env.REDIS_URL || 'redis://localhost:6379'
export const redis = new Redis(url)

export async function cacheGet<T>(key: string): Promise<T | null> {
  const v = await redis.get(key)
  if (!v) return null
  return JSON.parse(v) as T
}

export async function cacheSet(key: string, value: unknown, ttlSeconds = 60) {
  await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds)
}
