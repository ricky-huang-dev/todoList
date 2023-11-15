import AddTodo from './AddTodo.tsx'
import ViewTasks from './ViewTasks.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className="main">
        <ViewTasks />
      </section>
      <footer className="footer">{/* <ToDoCount /> */}</footer>
    </>
  )
}

export default App
