import { useState } from 'react'
import useTasks from '../hooks/useTasks'
import { ITask } from '../../models/taskModel'

function TodoText({ task }: { task: ITask }) {
  const [isEditing, setIsEditing] = useState(false)
  const { editMutation } = useTasks()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const newText = form.get('text') as string
    editMutation({ ...task, text: newText })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="text"
          required
          autoFocus={true}
          defaultValue={task.text}
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
          if (e.key === 'Enter') {
            setIsEditing(true)
          }
        }}
      >
        {task.text}
      </div>
    )
  }
}
export default TodoText
