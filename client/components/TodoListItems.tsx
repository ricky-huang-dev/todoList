import { useState } from 'react'
import styles from './PokemonListItem.module.css'
import UseTodo from './UseTodo'

interface Props {
  id: number
  task: string
  status: string
  deadline: number
  description: string
}

export default function TodoListItem({ id, task }: Props) {
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
      newStatus: '',
      newDeadline: 0,
      newDescription: '',
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
        <form onSubmit={handleEditSubmit} className={styles.form}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleStopEditingClick}>
            Stop Editing
          </button>
        </form>
      ) : (
        <p>
          {id} - {task} -{''}
          <span className={styles.buttons}>
            <button onClick={handleStartEditingClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </span>
        </p>
      )}
    </div>
  )
}
