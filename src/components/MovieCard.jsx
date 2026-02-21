import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMovies } from '../context/MovieContext'
import styles from './MovieCard.module.css'

const PLACEHOLDER = 'https://via.placeholder.com/300x445/1a1a1a/555?text=No+Image'

export default function MovieCard({ movie }) {
  const navigate = useNavigate()
  const { addToList, removeFromList, isInList } = useMovies()
  const [imgError, setImgError] = useState(false)
  const listed = isInList(movie.imdbID)

  const poster = (!imgError && movie.Poster && movie.Poster !== 'N/A') ? movie.Poster : PLACEHOLDER

  const toggleList = (e) => {
    e.stopPropagation()
    listed ? removeFromList(movie.imdbID) : addToList(movie)
  }

  return (
    <div className={styles.card} onClick={() => navigate(`/movie/${movie.imdbID}`)}>
      <div className={styles.posterWrap}>
        <img
          src={poster}
          alt={movie.Title}
          className={styles.poster}
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <div className={styles.actions}>
            <button className={styles.playBtn} title="View Details">▶</button>
            <button
              className={`${styles.listBtn} ${listed ? styles.listed : ''}`}
              onClick={toggleList}
              title={listed ? 'Remove from My List' : 'Add to My List'}
            >
              {listed ? '✓' : '+'}
            </button>
          </div>
          <div className={styles.meta}>
            <span className={styles.year}>{movie.Year}</span>
            {movie.Type && <span className={styles.type}>{movie.Type}</span>}
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{movie.Title}</p>
      </div>
    </div>
  )
}
