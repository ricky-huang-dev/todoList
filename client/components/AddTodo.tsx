import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo } from '../apis/clientApi'

// eslint-disable-next-line no-unused-vars
function AddTodo() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (input: string) => addTodo(input),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const input = form.get('newTodo') as string
    mutation.mutate(input)
    e.currentTarget.reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Add:
          <input
            name="newTodo"
            // className="new-todo"
            placeholder="What needs to be done?"
            autoFocus={true}
          />
        </label>
      </form>
    </>
  )
}

export default AddTodo
