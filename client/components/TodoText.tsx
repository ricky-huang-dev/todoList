import { useState } from 'react'
import useTasks from '../hooks/useTasks'
import { myTask } from '../../models/taskModel'

function TodoText({ task }: { task: myTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const { editMutation } = useTasks()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const newText = form.get('text') as string
    editMutation({ ...task, description: newText })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="text"
          required
          autoFocus={true}
          defaultValue={task.description}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsEditing(false)
          }}
        />
      </form>
    )
  } else {
    return (
      <div
        role="button"
        className={task.completed ? 'completed' : ''}
        tabIndex={0}
        onDoubleClick={() => {
          setIsEditing(true)
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsEditing(true)
          }
        }}
      >
        {task.description}
      </div>
    )
  }
}
export default TodoText
