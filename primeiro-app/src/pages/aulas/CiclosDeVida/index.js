import { useState, useEffect } from 'react'

function CiclosDeVida() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')

  useEffect(() => {
    const tasksStorage = JSON.parse(localStorage.getItem('@tasks'))
    if (tasksStorage) {
      setTasks(tasksStorage)
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('@tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  const handleRegister = e => {
    e.preventDefault()
    setTasks([...tasks, taskInput])
    setTaskInput('')
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
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
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

export default CiclosDeVida
