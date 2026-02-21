import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMovies } from '../../context/MovieContext'
import styles from './MovieRow.module.css'

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='445' viewBox='0 0 300 445'%3E%3Crect width='300' height='445' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='42%25' dominant-baseline='middle' text-anchor='middle' fill='%23333' font-size='48'%3E🎬%3C/text%3E%3Ctext x='50%25' y='58%25' dominant-baseline='middle' text-anchor='middle' fill='%23444' font-size='13' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E"

export default function MovieRow({ title, movies = [], loading }) {
  const rowRef = useRef(null)
  const navigate = useNavigate()
  const { addToList, removeFromList, isInList } = useMovies()

  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 640, behavior: 'smooth' })
  }

  if (loading) return (
    <div className={styles.section}>
      <h2 className={styles.rowTitle}>{title}</h2>
      <div className={styles.skeletonRow}>
        {Array(6).fill(0).map((_, i) => <div key={i} className={styles.skeleton} />)}
      </div>
    </div>
  )

  if (!movies.length) return null

  return (
    <div className={styles.section}>
      <h2 className={styles.rowTitle}>{title}</h2>
      <div className={styles.rowWrapper}>
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll(-1)}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
        </button>
        <div className={styles.row} ref={rowRef}>
          {movies.map(movie => {
            const inList = isInList(movie.imdbID)
            const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : null
            return (
              <div key={movie.imdbID} className={styles.card}>
                <div className={styles.posterWrap} onClick={() => navigate(`/movie/${movie.imdbID}`)}>
                  <img
                    className={styles.poster}
                    src={poster || PLACEHOLDER}
                    alt={movie.Title}
                    loading="lazy"
                    onError={e => { e.target.src = PLACEHOLDER }}
                  />
                  {!poster && <div className={styles.noPosterOverlay}></div>}
                  <div className={styles.overlay}>
                    <button className={styles.playCircle}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <p className={styles.cardTitle}>{movie.Title}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardYear}>{movie.Year}</span>
                    <button
                      className={`${styles.miniListBtn} ${inList ? styles.inList : ''}`}
                      onClick={() => inList ? removeFromList(movie.imdbID) : addToList(movie)}
                      title={inList ? 'Remove' : 'Add to My List'}
                    >
                      {inList ? '✓' : '+'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll(1)}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </button>
      </div>
    </div>
  )
}
