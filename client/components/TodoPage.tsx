import { useState } from 'react'
import '../index.scss'
import UseTodo from './UseTodo'

interface Props {
  id: number
  task: string
  completed: boolean
  toggleCompleted: () => void
}

export default function TodoPage({
  id,
  task,
  completed,
  toggleCompleted,
}: Props) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(task)

  const { deleteMutation, editMutation } = UseTodo()

  const handleDeleteClick = () => {
    deleteMutation.mutate({ id })
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    editMutation.mutate({
      id,
      newTask: text,
    })
    setEditing(false)
  }

  const handleStopEditingClick = () => {
    setEditing(false)
    setText(task)
  }

  const handleStartEditingClick = () => {
    setEditing(true)
  }

  return (
    <div>
      {editing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            defaultValue={task}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleStopEditingClick}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={toggleCompleted}
            />
            <span className={completed ? 'completed' : ''}>{task}</span>
          </label>
          <span>
            <button onClick={handleStartEditingClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </span>
        </div>
      )}
    </div>
  )
}
