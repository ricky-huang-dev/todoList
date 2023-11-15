import AddTodo from './AddTodo.tsx'
import TaskList from './TaskList.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>tasks</h1>
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
