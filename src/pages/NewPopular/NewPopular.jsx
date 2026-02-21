import { useState, useEffect } from 'react'
import MovieRow from '../../components/MovieRow/MovieRow'
import { useOMDb } from '../../hooks/useOMDb'
import styles from './NewPopular.module.css'

const ROWS = [
  { title: '🆕 New Releases 2024', query: '2024' },
  { title: '📈 Most Popular', query: 'popular' },
  { title: '🏆 Award Winners', query: 'oscar' },
  { title: '🌍 International', query: 'international' },
  { title: '💡 Coming Soon', query: '2025' },
]

export default function NewPopular() {
  const [rows, setRows] = useState({})
  const [loaded, setLoaded] = useState(false)
  const { searchMovies } = useOMDb()

  useEffect(() => {
    const load = async () => {
      const results = {}
      for (const row of ROWS) {
        results[row.query] = await searchMovies(row.query)
      }
      setRows(results)
      setLoaded(true)
    }
    load()
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.glow} />
        <h1 className={styles.title}>NEW & <span>POPULAR</span></h1>
        <p className={styles.sub}>What everyone's watching right now</p>
      </div>
      {ROWS.map(row => (
        <MovieRow key={row.query} title={row.title} movies={rows[row.query] || []} loading={!loaded} />
      ))}
    </div>
  )
}
