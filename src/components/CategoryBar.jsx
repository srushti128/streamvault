import styles from './CategoryBar.module.css'

const CATEGORIES = [
  { label: 'Action', query: 'action' },
  { label: 'Comedy', query: 'comedy' },
  { label: 'Drama', query: 'drama' },
  { label: 'Sci-Fi', query: 'sci-fi' },
  { label: 'Horror', query: 'horror' },
  { label: 'Romance', query: 'romance' },
]

export default function CategoryBar({ active, onSelect }) {
  return (
    <div className={styles.bar}>
      {CATEGORIES.map(cat => (
        <button
          key={cat.query}
          className={`${styles.btn} ${active === cat.query ? styles.active : ''}`}
          onClick={() => onSelect(cat.query === active ? '' : cat.query)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
