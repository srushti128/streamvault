import axios from 'axios'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com'

const omdb = axios.create({
  baseURL: BASE_URL,
  params: { apikey: API_KEY },
})

export const searchMovies = async (query, page = 1) => {
  const { data } = await omdb.get('/', { params: { s: query, page } })
  if (data.Response === 'False') throw new Error(data.Error || 'No results found')
  return data
}

export const getMovieById = async (id) => {
  const { data } = await omdb.get('/', { params: { i: id, plot: 'full' } })
  if (data.Response === 'False') throw new Error(data.Error || 'Movie not found')
  return data
}
