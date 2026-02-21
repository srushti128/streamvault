import { useRef } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef()

  return (
    <div className={styles.wrap}>
      <span className={styles.icon}>⌕</span>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Search movies, titles, directors..."
        value={value}
        onChange={e => onChange(e.target.value)}
        autoFocus
      />
      {value && (
        <button className={styles.clear} onClick={() => { onChange(''); inputRef.current.focus() }}>✕</button>
      )}
    </div>
  )
}
