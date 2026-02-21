import { useNavigate } from 'react-router-dom'
import { useMovies } from '../../context/MovieContext'
import styles from './MovieCard.module.css'

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='445' viewBox='0 0 300 445'%3E%3Crect width='300' height='445' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' fill='%23333' font-size='56'%3E🎬%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='%23444' font-size='14' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E"

export default function MovieCard({ movie }) {
  const navigate = useNavigate()
  const { addToList, removeFromList, isInList } = useMovies()
  const inList = isInList(movie.imdbID)

  const handleToggleList = (e) => {
    e.stopPropagation()
    inList ? removeFromList(movie.imdbID) : addToList(movie)
  }

  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER

  return (
    <div className={styles.card} onClick={() => navigate(`/movie/${movie.imdbID}`)}>
      <div className={styles.posterWrapper}>
        <img
          className={styles.poster}
          src={poster}
          alt={movie.Title}
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <p className={styles.year}>{movie.Year}</p>
            <h3 className={styles.title}>{movie.Title}</h3>
            <div className={styles.actions}>
              <button className={styles.detailBtn} onClick={() => navigate(`/movie/${movie.imdbID}`)}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8 5v14l11-7z"/></svg>
                Details
              </button>
              <button
                className={`${styles.listBtn} ${inList ? styles.inList : ''}`}
                onClick={handleToggleList}
                title={inList ? 'Remove from My List' : 'Add to My List'}
              >
                {inList ? '✓' : '+'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.cardTitle}>{movie.Title}</p>
        <p className={styles.cardYear}>{movie.Year}</p>
      </div>
    </div>
  )
}
