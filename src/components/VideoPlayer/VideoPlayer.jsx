import { useState, useRef, useEffect } from 'react'
import styles from './VideoPlayer.module.css'

// Simulated streaming player - plays a free sample video
const SAMPLE_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
]

export default function VideoPlayer({ movie, onClose }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [loading, setLoading] = useState(true)
  const controlsTimer = useRef(null)

  const videoSrc = SAMPLE_VIDEOS[Math.floor(Math.random() * SAMPLE_VIDEOS.length)]

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onLoaded = () => setLoading(false)
    const onTime = () => setCurrentTime(v.currentTime)
    const onDur = () => setDuration(v.duration)
    const onEnd = () => setPlaying(false)
    v.addEventListener('loadeddata', onLoaded)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onDur)
    v.addEventListener('ended', onEnd)
    return () => {
      v.removeEventListener('loadeddata', onLoaded)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onDur)
      v.removeEventListener('ended', onEnd)
    }
  }, [])

  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(controlsTimer.current)
    controlsTimer.current = setTimeout(() => playing && setShowControls(false), 3000)
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = ratio * duration
  }

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    videoRef.current.volume = val
    setMuted(val === 0)
  }

  const toggleMute = () => {
    const v = videoRef.current
    v.muted = !muted
    setMuted(!muted)
  }

  const toggleFullscreen = () => {
    const el = document.querySelector(`.${styles.playerWrapper}`)
    if (!fullscreen) el.requestFullscreen?.()
    else document.exitFullscreen?.()
    setFullscreen(!fullscreen)
  }

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className={styles.overlay}>
      <div
        className={styles.playerWrapper}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => playing && setShowControls(false)}
      >
        {loading && (
          <div className={styles.loadingScreen}>
            <div className={styles.loadingLogo}>STREAM<span>VAULT</span></div>
            <div className={styles.loadingBar}><div className={styles.loadingFill} /></div>
            <p className={styles.loadingTitle}>Now Playing: {movie?.Title}</p>
          </div>
        )}

        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          onClick={togglePlay}
          preload="metadata"
        />

        <div className={`${styles.controls} ${showControls || !playing ? styles.visible : ''}`}>
          <div className={styles.topBar}>
            <button className={styles.backBtn} onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>
            <div className={styles.movieInfo}>
              <h2 className={styles.movieTitle}>{movie?.Title}</h2>
              {movie?.Year && <span className={styles.movieYear}>{movie.Year}</span>}
            </div>
          </div>

          <div className={styles.bottomBar}>
            <div className={styles.progressBar} onClick={handleSeek}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }}>
                <div className={styles.progressThumb} />
              </div>
            </div>

            <div className={styles.controlRow}>
              <div className={styles.leftControls}>
                <button className={styles.controlBtn} onClick={togglePlay}>
                  {playing ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                <div className={styles.volumeGroup}>
                  <button className={styles.controlBtn} onClick={toggleMute}>
                    {muted || volume === 0 ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                      </svg>
                    )}
                  </button>
                  <input
                    type="range" min="0" max="1" step="0.05"
                    value={muted ? 0 : volume}
                    onChange={handleVolume}
                    className={styles.volumeSlider}
                  />
                </div>

                <span className={styles.timeDisplay}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className={styles.rightControls}>
                <button className={styles.controlBtn} onClick={toggleFullscreen}>
                  {fullscreen ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
