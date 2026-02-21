import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ring}>
        <div /><div /><div /><div />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  )
}
