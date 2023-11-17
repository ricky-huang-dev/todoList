import { useQuery } from '@tanstack/react-query'
import { getToDos } from '../apis/clientApi'
import Tasks from './Tasks'
import Footer from './Footer'
import AddTodo from './AddTodo'

function Homepage() {
  const {
    data: tasks,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getToDos,
  })

  console.log(tasks)

  if (isLoading) return <p>Loading</p>

  if (isError) return error
  return (
    <>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />

        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul key={tasks} className="todo-list">
          {/* <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */}
          <Tasks tasks={tasks} />
        </ul>
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>
        {/* <!-- Remove the below line ↓ --> */}
      </footer>
    </>
  )
}

export default Homepage
