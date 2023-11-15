import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/taskApi.ts'
import { ITask } from '../../models/taskModel.ts'
import useTasks from '../hooks/useTasks.ts'

function TaskList() {
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

  const { editMutation, deleteMutation } = useTasks()

  function handleToggleCompleted(task: ITask) {
    editMutation.mutate(task)
  }

  function handleDeleteTask(taskId: ITask['id']) {
    deleteMutation.mutate(taskId)
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
            <button
              name="destroy"
              className="destroy"
              onClick={() => handleDeleteTask(task.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
