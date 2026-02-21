import styles from './CategoryPills.module.css'

const CATEGORIES = [
  { label: 'Action', emoji: '💥', query: 'action' },
  { label: 'Comedy', emoji: '😂', query: 'comedy' },
  { label: 'Drama', emoji: '🎭', query: 'drama' },
  { label: 'Sci-Fi', emoji: '🚀', query: 'science fiction' },
  { label: 'Horror', emoji: '👻', query: 'horror' },
  { label: 'Thriller', emoji: '🔪', query: 'thriller' },
]

export default function CategoryPills({ active, onSelect }) {
  return (
    <div className={styles.pills}>
      {CATEGORIES.map(cat => (
        <button
          key={cat.label}
          className={`${styles.pill} ${active === cat.query ? styles.active : ''}`}
          onClick={() => onSelect(active === cat.query ? null : cat.query)}
        >
          <span className={styles.emoji}>{cat.emoji}</span>
          {cat.label}
        </button>
      ))}
    </div>
  )
}
