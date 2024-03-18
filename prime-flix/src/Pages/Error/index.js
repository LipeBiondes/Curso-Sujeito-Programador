import { Link } from 'react-router-dom'
import './style.css'
export default function Error() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <ph2>Página não encontrada.</ph2>
      <Link to="/">Veja todos os filmes!</Link>
    </div>
  )
}
