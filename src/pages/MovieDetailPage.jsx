import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieById } from '../utils/api'
import { useMovies } from '../context/MovieContext'
import Spinner from '../components/Spinner'
import styles from './MovieDetailPage.module.css'

const PLACEHOLDER = 'https://via.placeholder.com/400x600/1a1a1a/555?text=No+Image'

export default function MovieDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToList, removeFromList, isInList } = useMovies()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imgError, setImgError] = useState(false)

  const listed = movie ? isInList(movie.imdbID) : false

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    getMovieById(id)
      .then(setMovie)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  const toggleList = () => {
    if (!movie) return
    listed ? removeFromList(movie.imdbID) : addToList({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Type: movie.Type,
    })
  }

  if (loading) return <Spinner fullscreen />

  if (error) return (
    <div className={styles.error}>
      <p>{error}</p>
      <button onClick={() => navigate(-1)}>← Go Back</button>
    </div>
  )

  if (!movie) return null

  const poster = (!imgError && movie.Poster && movie.Poster !== 'N/A') ? movie.Poster : PLACEHOLDER
  const rating = parseFloat(movie.imdbRating) || 0

  return (
    <div className={styles.page}>
      {/* Backdrop */}
      <div className={styles.backdrop}>
        <img src={poster} alt="" className={styles.backdropImg} onError={() => {}} />
        <div className={styles.backdropOverlay} />
      </div>

      <div className={styles.content}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>

        <div className={styles.main}>
          {/* Poster */}
          <div className={styles.posterWrap}>
            <img
              src={poster}
              alt={movie.Title}
              className={styles.poster}
              onError={() => setImgError(true)}
            />
          </div>

          {/* Info */}
          <div className={styles.info}>
            <div className={styles.genres}>
              {movie.Genre && movie.Genre.split(',').map(g => (
                <span key={g} className={styles.genreTag}>{g.trim()}</span>
              ))}
            </div>

            <h1 className={styles.title}>{movie.Title}</h1>

            <div className={styles.meta}>
              {movie.Year && <span>{movie.Year}</span>}
              {movie.Runtime && movie.Runtime !== 'N/A' && <span>{movie.Runtime}</span>}
              {movie.Rated && movie.Rated !== 'N/A' && <span className={styles.rated}>{movie.Rated}</span>}
              {movie.Language && movie.Language !== 'N/A' && <span>{movie.Language.split(',')[0]}</span>}
            </div>

            {/* Rating */}
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <div className={styles.ratingRow}>
                <div className={styles.stars}>
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={rating/2 >= s ? styles.starFill : styles.starEmpty}>★</span>
                  ))}
                </div>
                <span className={styles.imdbScore}>⭐ {movie.imdbRating} <span className={styles.imdbLabel}>IMDb</span></span>
                {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                  <span className={styles.votes}>{parseInt(movie.imdbVotes.replace(/,/g,'')).toLocaleString()} votes</span>
                )}
              </div>
            )}

            {/* Plot */}
            {movie.Plot && movie.Plot !== 'N/A' && (
              <p className={styles.plot}>{movie.Plot}</p>
            )}

            {/* Action buttons */}
            <div className={styles.buttons}>
              <button className={styles.playBtn}>▶ Watch Trailer</button>
              <button
                className={`${styles.listBtn} ${listed ? styles.listed : ''}`}
                onClick={toggleList}
              >
                {listed ? '✓ In My List' : '+ My List'}
              </button>
            </div>

            {/* Details */}
            <div className={styles.details}>
              {movie.Director && movie.Director !== 'N/A' && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Director</span>
                  <span className={styles.detailValue}>{movie.Director}</span>
                </div>
              )}
              {movie.Actors && movie.Actors !== 'N/A' && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Cast</span>
                  <span className={styles.detailValue}>{movie.Actors}</span>
                </div>
              )}
              {movie.Writer && movie.Writer !== 'N/A' && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Writer</span>
                  <span className={styles.detailValue}>{movie.Writer}</span>
                </div>
              )}
              {movie.Country && movie.Country !== 'N/A' && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Country</span>
                  <span className={styles.detailValue}>{movie.Country}</span>
                </div>
              )}
              {movie.Awards && movie.Awards !== 'N/A' && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Awards</span>
                  <span className={styles.detailValue}>{movie.Awards}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
