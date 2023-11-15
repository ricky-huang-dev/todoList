import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../apis/taskApi'
import { useState } from 'react'

// eslint-disable-next-line no-unused-vars
function AddTodo() {
  const queryClient = useQueryClient()
  const [newTaskText, setNewTaskText] = useState('')

  const addMutation = useMutation({
    mutationFn: () => addTask(newTaskText),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    addMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
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
