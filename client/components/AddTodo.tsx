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
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          type="text"
          name="newTask"
        />
      </form>
    </>
  )
}

export default AddTodo
