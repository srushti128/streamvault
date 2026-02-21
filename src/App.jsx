import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import MovieDetails from './pages/MovieDetails/MovieDetails'
import MyListPage from './pages/MyListPage/MyListPage'
import TVShows from './pages/TVShows/TVShows'
import Movies from './pages/Movies/Movies'
import NewPopular from './pages/NewPopular/NewPopular'
import Auth from './pages/Auth/Auth'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />
  return children
}

function AppContent() {
  const { user } = useAuth()
  const location = useLocation()
  const isAuthPage = location.pathname === '/auth'

  return (
    <div className="app">
      {user && !isAuthPage && <Navbar />}
      <Routes>
        <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/tvshows" element={<ProtectedRoute><TVShows /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path="/new-popular" element={<ProtectedRoute><NewPopular /></ProtectedRoute>} />
        <Route path="/mylist" element={<ProtectedRoute><MyListPage /></ProtectedRoute>} />
        <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <AppContent />
      </MovieProvider>
    </AuthProvider>
  )
}
