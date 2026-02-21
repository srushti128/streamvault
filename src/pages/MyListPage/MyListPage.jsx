import { useMovies } from '../../context/MovieContext'
import MovieRow from '../../components/MovieRow/MovieRow'
import styles from './MyListPage.module.css'

export default function MyListPage() {
  const { myList } = useMovies()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.glow} />
        <h1 className={styles.title}>MY <span>LIST</span></h1>
        <p className={styles.sub}>
          {myList.length > 0
            ? `${myList.length} title${myList.length !== 1 ? 's' : ''} saved`
            : 'Start adding movies to build your watchlist'}
        </p>
      </div>

      {myList.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📋</div>
          <h2 className={styles.emptyTitle}>Your list is empty</h2>
          <p className={styles.emptyText}>
            Browse <strong>Movies</strong>, <strong>TV Shows</strong>, or <strong>New & Popular</strong><br />
            and click <strong>+</strong> to add titles here.
          </p>
        </div>
      ) : (
        <MovieRow title="Saved Titles" movies={myList} />
      )}
    </div>
  )
}
