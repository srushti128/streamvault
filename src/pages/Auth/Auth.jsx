import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Auth.module.css'

export default function Auth() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (mode === 'signup' && form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setErrors({})
    await new Promise(r => setTimeout(r, 800))
    const result = mode === 'signin'
      ? signIn({ email: form.email, password: form.password })
      : signUp({ name: form.name, email: form.email, password: form.password })
    setLoading(false)
    if (result.success) navigate('/')
    else setErrors({ general: result.error })
  }

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    setErrors(prev => ({ ...prev, [field]: '', general: '' }))
  }

  const switchMode = () => {
    setMode(m => m === 'signin' ? 'signup' : 'signin')
    setForm({ name: '', email: '', password: '', confirm: '' })
    setErrors({})
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.overlay} />

      <div className={styles.logoBar}>
        <div className={styles.logo}>STREAM<span>VAULT</span></div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h1>
          <p className={styles.subtitle}>
            {mode === 'signin' ? 'Sign in to continue watching' : 'Join StreamVault for free'}
          </p>
        </div>

        {errors.general && (
          <div className={styles.alertError}>
            <span>⚠</span> {errors.general}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {mode === 'signup' && (
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <div className={`${styles.inputWrap} ${errors.name ? styles.inputError : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.inputIcon}>
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
                </svg>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange('name')}
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <div className={`${styles.inputWrap} ${errors.email ? styles.inputError : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.inputIcon}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                type="email"
                className={styles.input}
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange('email')}
                autoComplete="email"
              />
            </div>
            {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={`${styles.inputWrap} ${errors.password ? styles.inputError : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.inputIcon}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <input
                type={showPass ? 'text' : 'password'}
                className={styles.input}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange('password')}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(p => !p)}>
                {showPass ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
          </div>

          {mode === 'signup' && (
            <div className={styles.field}>
              <label className={styles.label}>Confirm Password</label>
              <div className={`${styles.inputWrap} ${errors.confirm ? styles.inputError : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.inputIcon}>
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <input
                  type={showPass ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="••••••••"
                  value={form.confirm}
                  onChange={handleChange('confirm')}
                  autoComplete="new-password"
                />
              </div>
              {errors.confirm && <p className={styles.fieldError}>{errors.confirm}</p>}
            </div>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span className={styles.btnSpinner} />
            ) : (
              mode === 'signin' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className={styles.divider}><span>or</span></div>

        <div className={styles.switchMode}>
          {mode === 'signin' ? (
            <p>New to StreamVault? <button className={styles.switchBtn} onClick={switchMode}>Create an account</button></p>
          ) : (
            <p>Already have an account? <button className={styles.switchBtn} onClick={switchMode}>Sign in</button></p>
          )}
        </div>

        {mode === 'signin' && (
          <p className={styles.demo}>
            <span>Demo:</span> use any email & password (6+ chars) after signing up
          </p>
        )}
      </div>

      <div className={styles.footer}>
        <p>© 2025 StreamVault. For demo purposes only.</p>
      </div>
    </div>
  )
}
