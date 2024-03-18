import { useParams } from 'react-router-dom'

export default function Produtos() {
  const { id } = useParams()
  return (
    <div>
      <h1>Produtos</h1>
      <span>Meu produto: {id}</span>
    </div>
  )
}
