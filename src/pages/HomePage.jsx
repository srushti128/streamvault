import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import CategoryBar from '../components/CategoryBar'
import MovieGrid from '../components/MovieGrid'
import Spinner from '../components/Spinner'
import { searchMovies } from '../utils/api'
import useDebounce from '../hooks/useDebounce'
import styles from './HomePage.module.css'

const DEFAULT_SEARCHES = ['marvel', 'star wars', 'batman', 'inception', 'spider']

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const debouncedQuery = useDebounce(query, 450)

  const activeSearch = debouncedQuery.trim() || category

  useEffect(() => {
    if (!activeSearch) {
      // Load a default set
      fetchMovies(DEFAULT_SEARCHES[Math.floor(Math.random() * DEFAULT_SEARCHES.length)], 1, true)
      return
    }
    fetchMovies(activeSearch, 1, true)
  }, [debouncedQuery, category])

  const fetchMovies = async (q, p, reset = false) => {
    setLoading(true)
    setError('')
    try {
      const data = await searchMovies(q, p)
      setMovies(prev => reset ? data.Search : [...prev, ...data.Search])
      setTotalResults(parseInt(data.totalResults, 10))
      setPage(p)
    } catch (err) {
      setError(err.message || 'Something went wrong')
      if (reset) setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    const next = page + 1
    fetchMovies(activeSearch, next, false)
  }

  const hasMore = movies.length < totalResults

  const handleCategorySelect = (cat) => {
    setCategory(cat)
    setQuery('')
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Movies</h1>
          <p className={styles.heroSub}>Search millions of titles. Build your list.</p>
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div className={styles.heroBg} />
      </div>

      {/* Categories */}
      <div className={styles.section}>
        <CategoryBar active={category} onSelect={handleCategorySelect} />

        {/* Results label */}
        {!loading && movies.length > 0 && (
          <p className={styles.resultCount}>
            {activeSearch
              ? `${totalResults.toLocaleString()} results for "${activeSearch}"`
              : 'Featured Movies'}
          </p>
        )}

        {/* Error */}
        {error && !loading && (
          <div className={styles.error}>
            <span>😕</span>
            <p>{error}</p>
          </div>
        )}

        {/* Grid */}
        {movies.length > 0 && <MovieGrid movies={movies} />}

        {/* Spinner */}
        {loading && <Spinner />}

        {/* Load More */}
        {!loading && hasMore && movies.length > 0 && (
          <div className={styles.loadMore}>
            <button className={styles.loadBtn} onClick={loadMore}>Load More</button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && movies.length === 0 && (
          <div className={styles.empty}>
            <p>No movies found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
