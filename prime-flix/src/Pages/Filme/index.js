import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../Services/api'
import './style.css'

import { toast } from 'react-toastify'
import api_key from '../../../secret'

export default function Filme() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: api_key,
            language: 'pt-BR'
          }
        })
        .then(response => {
          setMovie(response.data)
          setLoading(false)
        })
        .catch(error => {
          navigate('/', {
            replace: true
          })
        })
    }
    loadMovie()

    return () => {}
  }, [id, navigate])

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando os detalhes do seu filme...</h1>
      </div>
    )
  }

  function salvarFilme() {
    const minhaLista = localStorage.getItem('@filmes-prime-flix')

    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some(filmeSalvo => filmeSalvo.id === movie.id)

    if (hasFilme) {
      toast.warn('Você já possui esse filme salvo!')
      return
    }

    filmesSalvos.push(movie)
    localStorage.setItem('@filmes-prime-flix', JSON.stringify(filmesSalvos))
    toast.success('Filme salvo com sucesso!')
  }

  return (
    <div className="filme-info">
      <h1>{movie.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average} /10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="_blank"
            href={`https://www.youtube.com/results?search_query=${movie.title}+trailer`}
            rel="external noreferrer"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}
