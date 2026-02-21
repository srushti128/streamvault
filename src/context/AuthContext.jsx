import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('streamvault_user')) || null }
    catch { return null }
  })

  const [users, setUsers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('streamvault_users')) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('streamvault_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('streamvault_user', JSON.stringify(user))
  }, [user])

  const signUp = ({ name, email, password }) => {
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists.' }
    }
    const newUser = { id: Date.now(), name, email, password, avatar: name[0].toUpperCase(), createdAt: new Date().toISOString() }
    setUsers(prev => [...prev, newUser])
    setUser(newUser)
    return { success: true }
  }

  const signIn = ({ email, password }) => {
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, error: 'Invalid email or password.' }
    setUser(found)
    return { success: true }
  }

  const signOut = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
