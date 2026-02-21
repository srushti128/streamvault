import { useState, useEffect } from 'react'
import HeroSlider from '../../components/HeroSlider/HeroSlider'
import MovieRow from '../../components/MovieRow/MovieRow'
import SearchBar from '../../components/SearchBar/SearchBar'
import MovieGrid from '../../components/MovieGrid/MovieGrid'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { useOMDb } from '../../hooks/useOMDb'
import useDebounce from '../../hooks/useDebounce'
import styles from './Home.module.css'

const ROWS = [
  { title: '🔥 Trending Now', query: 'avengers' },
  { title: '⭐ Top Rated', query: 'godfather' },
  { title: '🎭 Drama', query: 'drama' },
  { title: '😂 Comedy', query: 'comedy' },
  { title: '🚀 Sci-Fi', query: 'space' },
  { title: '👊 Action', query: 'action' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [heroMovies, setHeroMovies] = useState([])
  const [rows, setRows] = useState({})
  const [rowsLoaded, setRowsLoaded] = useState(false)
  const debouncedQuery = useDebounce(query, 450)
  const { searchMovies, loading, error } = useOMDb()

  useEffect(() => {
    const loadRows = async () => {
      const heroData = await searchMovies('marvel')
      setHeroMovies(heroData.slice(0, 5))
      const results = {}
      for (const row of ROWS) {
        const data = await searchMovies(row.query)
        results[row.query] = data
      }
      setRows(results)
      setRowsLoaded(true)
    }
    loadRows()
  }, [])

  useEffect(() => {
    if (!debouncedQuery.trim()) { setSearchResults([]); return }
    searchMovies(debouncedQuery).then(setSearchResults)
  }, [debouncedQuery])

  return (
    <div className={styles.home}>
      <HeroSlider movies={heroMovies} />

      <div className={styles.searchSection}>
        <SearchBar onSearch={setQuery} value={query} />
      </div>

      {query ? (
        <div className={styles.searchResults}>
          <div className={styles.searchHeader}>
            <h2 className={styles.sectionTitle}>
              Results for <span>"{query}"</span>
            </h2>
            <button className={styles.clearBtn} onClick={() => setQuery('')}>Clear ✕</button>
          </div>
          {loading ? <LoadingSpinner text="Searching..." /> :
            error ? <p className={styles.errorMsg}>⚠ {error}</p> :
            <MovieGrid movies={searchResults} emptyMessage={`No results for "${query}"`} />
          }
        </div>
      ) : (
        <div className={styles.rows}>
          {ROWS.map(row => (
            <MovieRow
              key={row.query}
              title={row.title}
              movies={rows[row.query] || []}
              loading={!rowsLoaded}
            />
          ))}
        </div>
      )}
    </div>
  )
}
