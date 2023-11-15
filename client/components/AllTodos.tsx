// eslint-disable-next-line no-unused-vars

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteTask, getAllTasks } from '../apis/todos'

function AllTodos() {
  // delete task mutation
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

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

  // mutating the todos when someone clicks the delete button
  const handleDeleteClick = (id: number) => mutation.mutate(id)

  return (
    <>
      <ul className="todo-list">
        {data?.map((task) => (
          <li key={task.id}>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>{task.taskDetails}</label>
              <button
                onClick={() => handleDeleteClick(task.id)}
                className="destroy"
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AllTodos
