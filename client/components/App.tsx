import AddTodo from './AddTodo.tsx'
import Home from './Home.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <Home />
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
