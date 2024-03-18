import { useState } from 'react'

function CriandoTask() {
  const [tasks, setTasks] = useState([
    'Pagar a conta',
    'Estudar React',
    'Fazer compras  '
  ])
  const [task, setTask] = useState('')

  const handleRegister = e => {
    e.preventDefault()
    setTasks([...tasks, task])
    setTask('')
  }
  return (
    <div>
      <h1>Cadastrando usuario</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="">Nome da tarefa: </label>
        <br />
        <input
          required
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Digite o nome da tarefa"
        />
        <br />
        <button type="submit">Registrar</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CriandoTask
