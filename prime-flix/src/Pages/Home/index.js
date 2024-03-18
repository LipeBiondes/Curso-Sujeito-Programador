import { useEffect, useState } from 'react'
import api from '../../Services/api'
import { Link } from 'react-router-dom'

import './style.css'
import api_key from '../../../secret'
export default function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    async function loadMovies() {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: api_key,
          language: 'pt-BR',
          page: 1
        }
      })
      setMovies(response.data.results.slice(0, 10))
    }
    loadMovies()
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="container">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {movies.map(movie => (
          <article key={movie.id}>
            <strong>{movie.title}</strong>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
            <Link to={`/filme/${movie.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
