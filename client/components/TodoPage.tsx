import { useState } from 'react'
import '../index.scss'
import UseTodo from './UseTodo'

interface Props {
  id: number
  task: string
}

export default function TodoPage({ id, task }: Props) {
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
            Stop Editing
          </button>
        </form>
      ) : (
        <p>
          {task} {''} <br />
          <span>
            <button onClick={handleStartEditingClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </span>
        </p>
      )}
    </div>
  )
}
