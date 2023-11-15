import { useState } from 'react'
import useTasks from '../hooks/useTasks'

// eslint-disable-next-line no-unused-vars
function AddTodo() {
  const [newTaskText, setNewTaskText] = useState('')

  const { addMutation } = useTasks()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    addMutation(newTaskText)
    setNewTaskText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        // autoFocus={true}
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
    </form>
  )
}

export default AddTodo
