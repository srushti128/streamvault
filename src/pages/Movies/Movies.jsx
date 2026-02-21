import { useState, useEffect } from 'react'
import MovieRow from '../../components/MovieRow/MovieRow'
import { useOMDb } from '../../hooks/useOMDb'
import styles from './Movies.module.css'

const MOVIE_ROWS = [
  { title: '🎬 Blockbusters', query: 'blockbuster' },
  { title: '🎭 Drama', query: 'drama' },
  { title: '👊 Action & Adventure', query: 'action adventure' },
  { title: '😂 Comedy', query: 'comedy' },
  { title: '😱 Horror', query: 'horror' },
  { title: '❤️ Romance', query: 'romance' },
  { title: '🕵️ Mystery & Thriller', query: 'thriller mystery' },
]

export default function Movies() {
  const [rows, setRows] = useState({})
  const [loaded, setLoaded] = useState(false)
  const { searchMovies } = useOMDb()

  useEffect(() => {
    const load = async () => {
      const results = {}
      for (const row of MOVIE_ROWS) {
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
        <h1 className={styles.title}>MOVIES</h1>
        <p className={styles.sub}>Every genre, every mood — all in one place</p>
      </div>
      {MOVIE_ROWS.map(row => (
        <MovieRow key={row.query} title={row.title} movies={rows[row.query] || []} loading={!loaded} />
      ))}
    </div>
  )
}
