import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div>
      <h1>Ops, página não encontrada!</h1>
      <span>Tente essas paginas</span>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/sobre'}>Sobre</Link>
        </li>
        <li>
          <Link to={'/contato'}>Contato</Link>
        </li>
      </ul>
    </div>
  )
}
