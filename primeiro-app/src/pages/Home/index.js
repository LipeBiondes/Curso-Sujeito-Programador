import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>Bem vindo ao Home</h1>
      <Link to="/sobre">Página Sobre</Link> <br />
      <Link to="/contato">Página Contato</Link>
    </div>
  )
}
