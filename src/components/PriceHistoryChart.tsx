import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function PriceHistoryChart({ slug }: { slug: string }) {
  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    fetch(`/api/games/${slug}/history`)
      .then((r) => r.json())
      .then((d) => {
        const labels = d.data.map((h: any) => new Date(h.checkedAt).toLocaleString())
        const values = d.data.map((h: any) => h.convertedPriceBRL ?? null)
        setData({ labels, datasets: [{ label: 'Preço (BRL)', data: values, borderColor: '#06b6d4' }] })
      })
      .catch((e) => console.error(e))
  }, [slug])

  if (!data) return <div>Carregando gráfico...</div>
  return <Line data={data} />
}
