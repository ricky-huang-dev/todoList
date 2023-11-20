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
      <label htmlFor="new-todo" style={{ position: 'absolute', height: 0 }}>
        New todo
      </label>

      <input
        name="new-todo"
        id="new-todo"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
    </form>
  )
}

export default AddTodo
