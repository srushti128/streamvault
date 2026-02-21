import styles from './CategoryBar.module.css'

const CATEGORIES = [
  { label: 'Action', query: 'action' },
  { label: 'Comedy', query: 'comedy' },
  { label: 'Drama', query: 'drama' },
  { label: 'Sci-Fi', query: 'science fiction' },
  { label: 'Horror', query: 'horror' },
  { label: 'Romance', query: 'romance' },
]

export default function CategoryBar({ activeCategory, onSelect }) {
  return (
    <div className={styles.bar}>
      {CATEGORIES.map(cat => (
        <button
          key={cat.query}
          className={`${styles.btn} ${activeCategory === cat.query ? styles.active : ''}`}
          onClick={() => onSelect(cat.query === activeCategory ? null : cat.query)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
