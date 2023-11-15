import AddTodo from './AddTodo.tsx'
import Homepage from './Homepage.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <Homepage />
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
