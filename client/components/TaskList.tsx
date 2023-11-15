import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTasks, toggleCompleted } from '../apis/taskApi.ts'
import { ITask } from '../../models/taskModel.ts'

function TaskList() {
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

  const queryClient = useQueryClient()

  const editMutation = useMutation({
    mutationFn: (task: ITask) => toggleCompleted(task),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  function handleToggleCompleted(task: ITask) {
    editMutation.mutate(task)
  }

  return (
    <ul className="todo-list">
      {data?.map((task) => (
        <li key={task.id}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(task)}
            />
            <label htmlFor="toggle">{task.text}</label>
            <button name="destroy" className="destroy"></button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
