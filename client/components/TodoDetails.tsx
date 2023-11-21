import { useState } from 'react'
import { TodoTask } from '../../models/todos'
import useTodos from '../hooks/useTodos'

function TodoDetails({ todoJob }: { todoJob: TodoTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const { editMutation } = useTodos()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const newText = form.get('text') as string
    editMutation({ ...todoJob, taskDetails: newText })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="text"
          className="new-todo edit"
          required
          // autoFocus={true}
          defaultValue={todoJob.taskDetails}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsEditing(false)
          }}
        />
      </form>
    )
  } else {
    return (
      <label
        htmlFor="toggle"
        onDoubleClick={() => {
          setIsEditing(true)
        }}
      >
        {todoJob.taskDetails}
      </label>
    )
  }
}
export default TodoDetails
