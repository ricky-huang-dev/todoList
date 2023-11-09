import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteTask, fetchTodos } from '../apis/todos'

function TodoList() {
  const { data } = useQuery({
    queryKey: ['todoTask'],
    queryFn: fetchTodos,
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todoTask'])
    },
  })

  const handleDeleteClick = (id: number) => {
    mutation.mutate(id)
  }

  return (
    <>
      <ul className="todo-list">
        {data?.map((todoTask) =>
          todoTask.completed === 'No' ? (
            <li key={todoTask.id}>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>{todoTask.taskDetails}</label>
                <button
                  className="destroy"
                  onClick={() => handleDeleteClick(todoTask.id)}
                ></button>
              </div>
            </li>
          ) : (
            <li className="completed" key={todoTask.id}>
              <div className="view">
                <input className="toggle" type="checkbox" checked />
                <label>{todoTask.taskDetails}</label>
                <button
                  className="destroy"
                  onClick={() => handleDeleteClick(todoTask.id)}
                ></button>
              </div>
            </li>
          )
        )}
      </ul>
    </>
  )
}

export default TodoList
