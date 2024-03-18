import { useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

export default function Favoritos() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const minhaLista = localStorage.getItem('@filmes-prime-flix')
    setMovies(JSON.parse(minhaLista) || [])
    setLoading(false)
  }, [])

  if (loading) {
    return <h1>Carregando sua lista de filmes favoritos...</h1>
  }

  function excluirFilme(id) {
    let filtroFilmes = movies.filter(item => {
      return item.id !== id
    })

    

    setMovies(filtroFilmes)
    localStorage.setItem('@filmes-prime-flix', JSON.stringify(filtroFilmes))
    toast.success('Filme excluído com sucesso!')
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>
      {movies.length === 0 && <span>Você não possui filmes salvos :(</span>}
      <ul>
        {movies.map(item => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
