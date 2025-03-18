import { useState, useEffect } from "react"
import { MovieContext } from "./MovieContext"

export const MovieProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites')
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFavorite = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (moviedId) => {
        return favorites.some(movie => movie.id === moviedId)
    }

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
