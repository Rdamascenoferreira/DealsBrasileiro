import axios from 'axios'

const DEFAULT_API = 'https://api.exchangerate.host/latest'

export async function convertToBRL(amount: number, currency: string): Promise<number> {
  if (currency === 'BRL') return amount
  try {
    const res = await axios.get(DEFAULT_API, { params: { base: currency, symbols: 'BRL' } })
    const rate = res.data?.rates?.BRL
    if (!rate) throw new Error('rate not found')
    return amount * rate
  } catch (err) {
    console.warn('exchange failed', err)
    return amount
  }
}
