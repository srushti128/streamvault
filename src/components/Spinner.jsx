import styles from './Spinner.module.css'

export default function Spinner({ fullscreen = false }) {
  return (
    <div className={`${styles.wrap} ${fullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.ring}></div>
    </div>
  )
}
