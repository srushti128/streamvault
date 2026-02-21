import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useOMDb } from '../../hooks/useOMDb'
import { useMovies } from '../../context/MovieContext'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import styles from './MovieDetails.module.css'

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='445' viewBox='0 0 300 445'%3E%3Crect width='300' height='445' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' fill='%23333' font-size='56'%3E🎬%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='%23444' font-size='14' font-family='sans-serif'%3ENo Image Available%3C/text%3E%3C/svg%3E"

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getMovieById, loading, error } = useOMDb()
  const { addToList, removeFromList, isInList } = useMovies()
  const [movie, setMovie] = useState(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    getMovieById(id).then(data => { if (data) setMovie(data) })
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return <div className={styles.loadingPage}><LoadingSpinner text="Loading movie details..." /></div>
  if (error || !movie) return (
    <div className={styles.errorPage}>
      <p>⚠️ {error || 'Movie not found'}</p>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>← Go Back</button>
    </div>
  )

  const inList = isInList(movie.imdbID)
  const posterSrc = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER

  return (
    <>
      {playing && <VideoPlayer movie={movie} onClose={() => setPlaying(false)} />}
      <div className={styles.page}>
        <div className={styles.backdrop} style={{ backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : ''})` }} />
        <div className={styles.backdropOverlay} />

        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>

        <div className={styles.content}>
          <div className={styles.posterSide}>
            <div className={styles.posterFrame}>
              <img className={styles.poster} src={posterSrc} alt={movie.Title} onError={e => { e.target.src = PLACEHOLDER }} />
              {movie.imdbRating !== 'N/A' && (
                <div className={styles.ratingBadge}>★ {movie.imdbRating}</div>
              )}
            </div>
          </div>

          <div className={styles.infoSide}>
            <div className={styles.genres}>
              {movie.Genre !== 'N/A' && movie.Genre.split(',').map(g => (
                <span key={g.trim()} className={styles.genreTag}>{g.trim()}</span>
              ))}
            </div>
            <h1 className={styles.title}>{movie.Title}</h1>
            <div className={styles.metaRow}>
              {movie.Year !== 'N/A' && <div className={styles.badge}><span className={styles.bl}>Year</span><span className={styles.bv}>{movie.Year}</span></div>}
              {movie.Runtime !== 'N/A' && <div className={styles.badge}><span className={styles.bl}>Runtime</span><span className={styles.bv}>{movie.Runtime}</span></div>}
              {movie.Rated !== 'N/A' && <div className={styles.badge}><span className={styles.bl}>Rated</span><span className={styles.bv}>{movie.Rated}</span></div>}
              {movie.imdbRating !== 'N/A' && (
                <div className={styles.ratingMeta}>
                  <span className={styles.star}>★</span>
                  <span className={styles.ratingNum}>{movie.imdbRating}</span>
                  <span className={styles.ratingMax}>/10</span>
                </div>
              )}
            </div>
            <p className={styles.plot}>{movie.Plot !== 'N/A' ? movie.Plot : 'No plot available.'}</p>
            <div className={styles.credits}>
              {movie.Director !== 'N/A' && <div className={styles.creditRow}><span className={styles.cl}>Director</span><span className={styles.cv}>{movie.Director}</span></div>}
              {movie.Actors !== 'N/A' && <div className={styles.creditRow}><span className={styles.cl}>Cast</span><span className={styles.cv}>{movie.Actors}</span></div>}
              {movie.Language !== 'N/A' && <div className={styles.creditRow}><span className={styles.cl}>Language</span><span className={styles.cv}>{movie.Language}</span></div>}
              {movie.Country !== 'N/A' && <div className={styles.creditRow}><span className={styles.cl}>Country</span><span className={styles.cv}>{movie.Country}</span></div>}
            </div>
            <div className={styles.actions}>
              <button className={styles.playBtn} onClick={() => setPlaying(true)}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M8 5v14l11-7z"/></svg>
                Play Now
              </button>
              <button className={`${styles.listBtn} ${inList ? styles.inList : ''}`} onClick={() => inList ? removeFromList(movie.imdbID) : addToList(movie)}>
                {inList ? '✓ In My List' : '+ My List'}
              </button>
            </div>
            {movie.Awards && movie.Awards !== 'N/A' && (
              <div className={styles.awards}><span>🏆</span><span className={styles.awardText}>{movie.Awards}</span></div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
