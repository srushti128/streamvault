import { useState, useCallback } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com'

export function useOMDb() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchMovies = useCallback(async (query) => {
    if (!query?.trim()) return []
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.get(BASE_URL, {
        params: { apikey: API_KEY, s: query, type: 'movie' }
      })
      if (data.Response === 'True') return data.Search || []
      setError(data.Error)
      return []
    } catch {
      setError('Failed to fetch movies. Check your network and API key.')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const getMovieById = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.get(BASE_URL, {
        params: { apikey: API_KEY, i: id, plot: 'full' }
      })
      if (data.Response === 'True') return data
      setError(data.Error)
      return null
    } catch {
      setError('Failed to fetch movie details.')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { searchMovies, getMovieById, loading, error }
}
