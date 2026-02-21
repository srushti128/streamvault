import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useMovies } from '../../context/MovieContext'
import { useAuth } from '../../context/AuthContext'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'TV Shows', path: '/tvshows' },
  { label: 'Movies', path: '/movies' },
  { label: 'New & Popular', path: '/new-popular' },
  { label: 'My List', path: '/mylist' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { myList } = useMovies()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  const handleSignOut = () => {
    signOut()
    navigate('/auth')
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>STREAM<span>VAULT</span></Link>
        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.link} ${location.pathname === link.path ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              {link.path === '/mylist' && myList.length > 0 && (
                <span className={styles.badge}>{myList.length}</span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        {user && (
          <div className={styles.profileWrap}>
            <button className={styles.avatar} onClick={() => setProfileOpen(p => !p)}>
              {user.avatar}
            </button>
            {profileOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownUser}>
                  <div className={styles.dropdownAvatar}>{user.avatar}</div>
                  <div>
                    <p className={styles.dropdownName}>{user.name}</p>
                    <p className={styles.dropdownEmail}>{user.email}</p>
                  </div>
                </div>
                <div className={styles.dropdownDivider} />
                <button className={styles.dropdownItem} onClick={() => { navigate('/mylist'); setProfileOpen(false) }}>
                  📋 My List
                </button>
                <button className={styles.dropdownItem} onClick={handleSignOut}>
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>
        )}
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? styles.spanOpen1 : ''} />
          <span className={menuOpen ? styles.spanOpen2 : ''} />
          <span className={menuOpen ? styles.spanOpen3 : ''} />
        </button>
      </div>
    </nav>
  )
}
