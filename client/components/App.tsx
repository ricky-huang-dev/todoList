import AddTodo from './AddTodo.tsx'
import AllTodos from './AllTodos.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
      </header>
      <section className="main">
        <AddTodo />
        <AllTodos />
      </section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
