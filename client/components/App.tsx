import AddTodo from './AddTodo.tsx'
import TodoList from './TodoList.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className="main">
        <TodoList />
      </section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
