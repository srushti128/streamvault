import { useState, useEffect } from 'react'
import MovieRow from '../../components/MovieRow/MovieRow'
import { useOMDb } from '../../hooks/useOMDb'
import styles from './TVShows.module.css'

const TV_ROWS = [
  { title: '📺 Popular Series', query: 'series' },
  { title: '🕵️ Crime & Thriller', query: 'crime thriller' },
  { title: '🧪 Sci-Fi Series', query: 'sci-fi series' },
  { title: '😂 Comedy Series', query: 'sitcom' },
  { title: '🏰 Fantasy', query: 'fantasy' },
]

export default function TVShows() {
  const [rows, setRows] = useState({})
  const [loaded, setLoaded] = useState(false)
  const { searchMovies } = useOMDb()

  useEffect(() => {
    const load = async () => {
      const results = {}
      for (const row of TV_ROWS) {
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
        <h1 className={styles.title}>TV <span>SHOWS</span></h1>
        <p className={styles.sub}>Binge-worthy series, handpicked for you</p>
      </div>
      {TV_ROWS.map(row => (
        <MovieRow key={row.query} title={row.title} movies={rows[row.query] || []} loading={!loaded} />
      ))}
    </div>
  )
}
