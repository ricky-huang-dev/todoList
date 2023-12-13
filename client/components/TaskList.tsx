import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/taskApi.ts'
import { ITask } from '../../models/taskModel.ts'
import useTasks from '../hooks/useTasks.ts'
import TodoText from './TodoText.tsx'

function TaskList() {
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    select: (data) => data.sort((a, b) => a.text.localeCompare(b.text)), // sort alphabetically
  })

  const { editMutation, deleteMutation } = useTasks()

  function handleToggleCompleted(task: ITask) {
    editMutation({ ...task, completed: !task.completed })
  }

  function handleDeleteTask(taskId: ITask['id']) {
    const shouldDelete = window.confirm('Delete this task?')
    if (shouldDelete) deleteMutation(taskId)
  }

  return (
    <ul
      className="todo-list"
      style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
    >
      {data?.map((task) => (
        <li key={task.id}>
          <div
            className="view"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #e6e6e6',
            }}
          >
            <TodoText task={task} />
            <div style={{ display: 'flex', gap: '5px' }}>
              <button
                id="btn-complete"
                name="complete"
                onClick={() => {
                  handleToggleCompleted(task)
                }}
              >
                toggle done
              </button>
              <button
                id="btn-destroy"
                name="destroy"
                onClick={() => handleDeleteTask(task.id)}
              >
                delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
