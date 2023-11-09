import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../apis/todos'

interface Props {
  id: number
  taskDetails: string
}

export default function TodoItem({ id, taskDetails }: Props) {
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
    <li key={id} className="completed">
      <div className="view">
        <input className="toggle" type="checkbox" checked />
        <label>{taskDetails}</label>
        <button
          className="destroy"
          onClick={() => handleDeleteClick(id)}
        ></button>
      </div>
    </li>
  )
}
