import TodoList from './TodoList'
import '../index.scss'

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <TodoList />
      </header>
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
