import AddTodo from './AddTodo.tsx'
import AllTodos from './AllTodos.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
        <AllTodos />
      </header>
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
