import MovieCard from '../MovieCard/MovieCard'
import styles from './MovieGrid.module.css'

export default function MovieGrid({ movies, emptyMessage = 'No movies found' }) {
  if (!movies || movies.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🎬</div>
        <p className={styles.emptyText}>{emptyMessage}</p>
      </div>
    )
  }
  return (
    <div className={styles.grid}>
      {movies.map(movie => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}
