import axios from 'axios'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

const omdb = axios.create({ baseURL: BASE_URL })

export const searchMovies = async (query, page = 1) => {
  const { data } = await omdb.get('/', {
    params: { apikey: API_KEY, s: query, type: 'movie', page }
  })
  if (data.Response === 'False') throw new Error(data.Error)
  return data
}

export const getMovieById = async (imdbID) => {
  const { data } = await omdb.get('/', {
    params: { apikey: API_KEY, i: imdbID, plot: 'full' }
  })
  if (data.Response === 'False') throw new Error(data.Error)
  return data
}
