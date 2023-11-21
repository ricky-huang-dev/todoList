import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask, editTask } from '../apis/todos'
import { useState } from 'react'

interface Props {
  id: number
  taskDetails: string
  completed: boolean
}

function TodoItem({ id, taskDetails, completed }: Props) {
  const [editing, setEditing] = useState(false)
  const [task, setTask] = useState(taskDetails)
  const [taskComplete, setTaskComplete] = useState(completed)

  // mutating the todos when someone clicks the delete button
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })
  const handleDeleteClick = (id: number) => mutation.mutate(id)

  // edit task functions
  const mutation1 = useMutation({
    mutationFn: () =>
      editTask({ id, taskDetails: task, completed: taskComplete }),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })
  const handleTaskEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation1.mutate()
    setEditing(!editing)
    setEditing(false)
  }

  const handleCheckboxChange = () => {
    setTaskComplete(!taskComplete)
  }

  return (
    <>
      <li key={id} className={taskComplete === true ? 'completed' : ''}>
        <div className="view">
          <div>
            <input
              className="toggle"
              type="checkbox"
              checked={taskComplete}
              onChange={handleCheckboxChange}
              aria-label="task"
            />
          </div>

          {editing ? (
            <form onSubmit={handleTaskEditSubmit}>
              <input
                type="text"
                className="new-todo"
                required
                value={task}
                id={`task-${id}`}
                onChange={(e) => setTask(e.target.value)}
              />
              <button type="submit"></button>
            </form>
          ) : (
            <div
              className="new-todo"
              onDoubleClick={() => setEditing(!editing)}
            >
              {taskDetails}
            </div>
          )}
          <button onClick={() => handleDeleteClick(id)} className="destroy">
            .
          </button>
        </div>
      </li>
    </>
  )
}

export default TodoItem
