// eslint-disable-next-line no-unused-vars
import useTodos from '../hooks/useTodos'
import { useState } from 'react'

function AddTodo() {
  const [newTodo, setNewTodo] = useState('')
  const { addMutation } = useTodos()
  //not sure how to know the type for event is VV
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addMutation(newTodo)
    setNewTodo('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
      />
    </form>
  )
}

export default AddTodo
