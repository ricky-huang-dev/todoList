// eslint-disable-next-line no-unused-vars
import { useState } from 'react'
import useTodos from '../hooks/useTodos'

function AddTodo() {
  const [newTodo, setNewTodo] = useState('')

  const { addMutation } = useTodos()

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    addMutation(newTodo)
    setNewTodo('')
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          // autoFocus={true}
          type="text"
          name="taskDetails"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </form>
    </>
  )
}

export default AddTodo
