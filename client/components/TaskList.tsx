import { useQuery } from '@tanstack/react-query'
import { getAllTasks } from '../apis/todos.ts'
import { myTask } from '../../models/taskModel.ts'
import useTasks from '../hooks/useTasks.ts'
import TodoText from './TodoText.tsx'

function TaskList() {
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
    //select: (data) => data.sort((a, b) => a.text.localeCompare(b.text)), // sort alphabetically
  })

  const { editMutation, deleteMutation } = useTasks()

  function handleToggleCompleted(task: myTask) {
    editMutation({ ...task, completed: !task.completed })
  }

  function handleDeleteTask(taskId: number) {
    const shouldDelete = window.confirm('Delete this task?')
    if (shouldDelete) deleteMutation(taskId)
  }
  console.log(data)
  return (
    <ul
      className="todo-list"
      style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
    >
      {data?.map((task: myTask) => (
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
                task done
              </button>
              <button
                id="btn-destroy"
                name="destroy"
                onClick={() => handleDeleteTask(task.id)}
              >
                delete task
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
