import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/taskApi.ts'
import { ITask } from '../../models/taskModel.ts'
import useTasks from '../hooks/useTasks.ts'
import TodoText from './TodoText.tsx'

function TaskList() {
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    select: (data) =>
      data
        .sort((a, b) => a.text.localeCompare(b.text))
        .sort((a, b) => Number(a.completed) - Number(b.completed)),
  })

  const { editMutation, deleteMutation } = useTasks()

  function handleToggleCompleted(task: ITask) {
    editMutation.mutate({ ...task, completed: !task.completed })
  }

  function handleDeleteTask(taskId: ITask['id']) {
    deleteMutation.mutate(taskId)
  }

  return (
    <ul className="todo-list">
      {data?.map((task) => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(task)}
            />
            <TodoText task={task} />
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
