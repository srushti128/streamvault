import { createContext, useContext, useState, useEffect } from 'react'

const MovieContext = createContext()

export function MovieProvider({ children }) {
  const [myList, setMyList] = useState(() => {
    try { return JSON.parse(localStorage.getItem('streamvault_mylist')) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('streamvault_mylist', JSON.stringify(myList))
  }, [myList])

  const addToList = (movie) =>
    setMyList(prev => prev.find(m => m.imdbID === movie.imdbID) ? prev : [...prev, movie])

  const removeFromList = (imdbID) =>
    setMyList(prev => prev.filter(m => m.imdbID !== imdbID))

  const isInList = (imdbID) => myList.some(m => m.imdbID === imdbID)

  return (
    <MovieContext.Provider value={{ myList, addToList, removeFromList, isInList }}>
      {children}
    </MovieContext.Provider>
  )
}

export const useMovies = () => useContext(MovieContext)
