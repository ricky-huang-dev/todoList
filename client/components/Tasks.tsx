import * as models from '../../Models/tasks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteToDos } from '../apis/clientApi'

interface Props {
  tasks: any
}

function Tasks(props: Props) {
  // const [content, setContent] = useState()
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteToDos(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  function handleDelete(e: React.MouseEvent<HTMLElement>, id: number) {
    e.preventDefault()
    deleteMutation.mutate(id)
  }

  const displayTasks = props.tasks

  return (
    <>
      {displayTasks.map((todo: models.Tasks) => (
        <li key={todo.id}>
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>{todo.details}</label>
            <button
              onClick={(e) => handleDelete(e, todo.id)}
              className="destroy"
            ></button>
          </div>

          <input className="edit" value="Rule the web" />
        </li>
      ))}
    </>
  )
}

export default Tasks
