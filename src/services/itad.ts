import axios from 'axios'

const ITAD_BASE = 'https://api.isthereanydeal.com'

export async function searchGameItad(query: string) {
  // Minimal wrapper. Users should set ITAD_API_KEY in env
  const key = process.env.ITAD_API_KEY
  if (!key) throw new Error('ITAD_API_KEY not set')
  const res = await axios.get(`${ITAD_BASE}/v02/search/search/`, {
    params: {
      key,
      q: query,
      limit: 10,
    },
  })
  return res.data
}
