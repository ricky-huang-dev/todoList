import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task } from '../models/models'
import { deleteTaskApi } from '../apis/taskApi'

interface Props {
  tasks: Task[]
}

function Footer(props: Props) {
  const data = props.tasks

  function taskRemaining() {
    const filtered = data.filter((x: Task) => x.completed == false)
    return filtered.length
  }
  taskRemaining()

  const mutateDeleteTask = useMutation({
    mutationFn: (id: number) => deleteTaskApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })
  const queryClient = useQueryClient()

  function handleClearCompleted() {
    for (let i = 0; i < data.length; i++)
      if (data[i].completed) {
        mutateDeleteTask.mutate(data[i].id)
      }
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{taskRemaining()}</strong> item left
      </span>
     
      <button onClick={handleClearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

export default Footer