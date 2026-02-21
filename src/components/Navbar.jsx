import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMovies } from '../context/MovieContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { myList } = useMovies()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>FLIXR</Link>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/my-list" className={styles.link}>
          My List
          {myList.length > 0 && <span className={styles.badge}>{myList.length}</span>}
        </Link>
      </div>
    </nav>
  )
}
