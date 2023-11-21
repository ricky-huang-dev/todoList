import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../apis/todos'

// eslint-disable-next-line no-unused-vars
function AddTodo() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (taskDetails: string) => addTask(taskDetails),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })
  async function handleTaskSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const taskDetails = form.get('newTask')?.valueOf() as string
    mutation.mutate(taskDetails)
    e.currentTarget.reset()
  }

  return (
    <>
      <form onSubmit={handleTaskSubmit}>
        <label htmlFor="newTask">.</label>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          name="newTask"
          id="newTask"
        />
      </form>
    </>
  )
}

export default AddTodo
