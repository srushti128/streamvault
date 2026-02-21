import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMovies } from '../../context/MovieContext'
import styles from './HeroSlider.module.css'

const PLACEHOLDER_BG = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&q=80'

export default function HeroSlider({ movies = [] }) {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  const { addToList, removeFromList, isInList } = useMovies()

  useEffect(() => {
    if (movies.length < 2) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % movies.length), 6000)
    return () => clearInterval(timer)
  }, [movies.length])

  if (!movies.length) return null
  const movie = movies[current]
  const inList = isInList(movie.imdbID)
  const poster = movie.Poster !== 'N/A' ? movie.Poster : null

  return (
    <div className={styles.hero}>
      <div className={styles.bgWrapper}>
        {movies.map((m, i) => (
          <div
            key={m.imdbID}
            className={`${styles.bgSlide} ${i === current ? styles.bgActive : ''}`}
            style={{ backgroundImage: `url(${m.Poster !== 'N/A' ? m.Poster : PLACEHOLDER_BG})` }}
          />
        ))}
      </div>
      <div className={styles.gradients} />

      <div className={styles.content}>
        {poster && (
          <div className={styles.posterThumb}>
            <img src={poster} alt={movie.Title} className={styles.thumb} />
          </div>
        )}
        <div className={styles.info}>
          <div className={styles.badges}>
            <span className={styles.badge}>🔥 Featured</span>
            {movie.Year && <span className={styles.badgeYear}>{movie.Year}</span>}
          </div>
          <h1 className={styles.title}>{movie.Title}</h1>
          <div className={styles.actions}>
            <button className={styles.playBtn} onClick={() => navigate(`/movie/${movie.imdbID}`)}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
              Play
            </button>
            <button
              className={`${styles.listBtn} ${inList ? styles.inList : ''}`}
              onClick={() => inList ? removeFromList(movie.imdbID) : addToList(movie)}
            >
              {inList ? '✓ In List' : '+ My List'}
            </button>
            <button className={styles.infoBtn} onClick={() => navigate(`/movie/${movie.imdbID}`)}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              More Info
            </button>
          </div>
        </div>
      </div>

      {movies.length > 1 && (
        <div className={styles.dots}>
          {movies.map((_, i) => (
            <button key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ''}`} onClick={() => setCurrent(i)} />
          ))}
        </div>
      )}
    </div>
  )
}
