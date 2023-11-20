import AddTodo from './AddTodo.tsx'
import ViewTasks from './ViewTasks.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>Task Master</h1>
        <AddTodo />
      </header>
      <section className="main">
        <ViewTasks />
      </section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
