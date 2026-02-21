import { useState } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({ onSearch, value }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`${styles.wrapper} ${focused ? styles.focused : ''}`}>
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
      <input
        className={styles.input}
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value && (
        <button className={styles.clear} onClick={() => onSearch('')} aria-label="Clear">
          ✕
        </button>
      )}
    </div>
  )
}
