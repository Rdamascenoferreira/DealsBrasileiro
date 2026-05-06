import axios from 'axios'
import { STEAM_STORE_BASE_URL } from '../env'

export async function getSteamAppDetails(appId: string, cc = 'BR') {
  try {
    const res = await axios.get(`${STEAM_STORE_BASE_URL}/appdetails`, { params: { appids: appId, cc } })
    return res.data
  } catch (err) {
    console.warn('steam adapter failed', err)
    return null
  }
}

export async function normalizeSteamOffers(appId: string) {
  const data = await getSteamAppDetails(appId)
  if (!data) return []
  // Minimal normalization: Steam doesn't provide deal list in this endpoint; usually need other sources
  return []
}
