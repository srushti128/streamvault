import { useNavigate } from 'react-router-dom'
import { useMovies } from '../context/MovieContext'
import MovieGrid from '../components/MovieGrid'
import styles from './MyListPage.module.css'

export default function MyListPage() {
  const { myList } = useMovies()
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)}>← Back</button>
        <h1 className={styles.title}>My List</h1>
        <p className={styles.count}>{myList.length} {myList.length === 1 ? 'title' : 'titles'}</p>
      </div>

      {myList.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>📋</span>
          <h2>Your list is empty</h2>
          <p>Add movies by clicking the + button on any movie card.</p>
          <button className={styles.browseBtn} onClick={() => navigate('/')}>Browse Movies</button>
        </div>
      ) : (
        <MovieGrid movies={myList} />
      )}
    </div>
  )
}
