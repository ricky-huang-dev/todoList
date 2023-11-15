// eslint-disable-next-line no-unused-vars

import { useQuery } from '@tanstack/react-query'
import { getAllTasks } from '../apis/todos'
import TodoItem from './TodoItem'

function AllTodos() {
  // displaying tasks on loading
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
          <TodoItem
            key={task.id}
            id={task.id}
            taskDetails={task.taskDetails}
            completed={task.completed}
          />
        ))}
      </ul>
    </>
  )
}

export default AllTodos
