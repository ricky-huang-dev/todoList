import AddTodo from './AddTodo.tsx'

import { getTodos } from '../apis/clientApi.ts'
import { useQuery } from '@tanstack/react-query'
import TodoItem from './TodoItem.tsx'

function App() {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  if (isLoading) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>something went wrong</p>
  }

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {/* <!-- These are here just to show the structure of the list items --> */}
          {/* <!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */}
          <li className="completed">
            <div className="view">
              <input className="toggle" type="checkbox" checked />
              <label>Taste JavaScript</label>
              <button className="destroy"></button>
            </div>
            <input className="edit" value="Create a TodoMVC template" />
          </li>
          {todos?.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      </section>
      <footer className="footer">
        {/* <!-- This should be `0 items left` by default --> */}
        <span className="todo-count">
          <strong>0</strong> item left
        </span>
        {/* <!-- Remove this if you don't implement routing --> */}
        <ul className="filters">
          <li>
            <a className="selected" href="#/">
              All
            </a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        {/* <!-- Hidden if no completed items are left ↓ --> */}
        <button className="clear-completed">Clear completed</button>
      </footer>
    </>
  )
}

export default App
