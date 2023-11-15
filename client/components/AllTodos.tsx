// eslint-disable-next-line no-unused-vars

import { useQuery } from '@tanstack/react-query'
import { getAllTasks } from '../apis/todos'

function AllTodos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getAllTasks(),
  })
  if (isLoading) {
    return 'Loading...'
  }
  if (error) {
    return 'An error has occurred: ' + error
  }
  return (
    <>
      <ul className="todo-list">
        {data?.map((task) => (
          <li key={task.id}>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>{task.taskDetails}</label>
              <button className="destroy"></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AllTodos
