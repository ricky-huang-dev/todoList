import { useState } from 'react'
import { TodoTask } from '../../models/todos'
import useTodos from '../hooks/useTodos'

function TodoDetails({ todoJob }: { todoJob: TodoTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [task, setTask] = useState(todoJob.taskDetails)
  const { editMutation } = useTodos()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const newText = form.get('text')?.valueOf() as string
    editMutation({ ...todoJob, taskDetails: newText })
    setIsEditing(false)
  }
  return isEditing ? (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        name="text"
        className="new-todo"
        required
        // autoFocus={true}
        defaultValue={task}
        onBlur={() => setIsEditing(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsEditing(false)
        }}
        type="text"
        onChange={(e) => setTask(e.target.value)}
      />
    </form>
  ) : (
    <label htmlFor="toggle" onDoubleClick={() => setIsEditing(true)}>
      {todoJob.taskDetails}
    </label>
  )
}
export default TodoDetails
