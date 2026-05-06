import axios from 'axios'

const BASE = process.env.CHEAPSHARK_BASE_URL || 'https://www.cheapshark.com/api/1.0'

export async function searchCheapShark(q: string) {
  const res = await axios.get(`${BASE}/games`, { params: { title: q } })
  return res.data
}

export async function gameDealsById(id: string) {
  const res = await axios.get(`${BASE}/deals`, { params: { id } })
  return res.data
}
