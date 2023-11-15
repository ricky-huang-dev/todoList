import AddTodo from './AddTodo.tsx'
import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/taskApi.ts'

function TaskList() {
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => {
      return getTasks()
    },
  })

  return (
    <ul className="todo-list">
      {data?.map((task) => (
        <li key={task.id}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={task.completed}
            />
            <label htmlFor="toggle">{task.text}</label>
            <button name="destroy" className="destroy"></button>
          </div>
        </li>
      ))}
    </ul>
  )
}

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className="main">
        <TaskList />
      </section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
