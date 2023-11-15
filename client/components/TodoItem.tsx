import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todo } from '../../model/todos'
import { deleteTodo } from '../apis/clientApi'

export default function TodoItem(props: todo) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => deleteTodo(props.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })
  function handleDelete(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <>
      <li>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>{props.details}</label>
          <button onClick={handleDelete} className="destroy"></button>
        </div>
        <input className="edit" value="Rule the web" />
      </li>
    </>
  )
}
