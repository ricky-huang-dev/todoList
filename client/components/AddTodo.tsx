// eslint-disable-next-line no-unused-vars
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToDos } from '../apis/clientApi'

function AddTodo() {
  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: (input: string) => addToDos(input),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const input = form.get('newToDo') as string
    console.log(input)
    addMutation.mutate(input)
    e.currentTarget.reset()
  }

  return (
    <>
      <form onSubmit={handleAdd}>
        <label htmlFor="newToDo">
          <span className="visually-hidden">New Todo:</span>
          <input
            id="newToDo"
            name="newToDo"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus={true}
            aria-label="New Todo"
            required
          />
        </label>
        <button type="submit" className="visually-hidden">
          Add Todo
        </button>
      </form>
    </>
  )
}

export default AddTodo
