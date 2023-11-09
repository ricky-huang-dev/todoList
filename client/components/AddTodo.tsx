// eslint-disable-next-line no-unused-vars
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo } from '../apis/todos'
import { NewTodo } from '../../models/todos'

function AddTodo() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (newTodo: NewTodo) => addTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(['todoTask'])
    },
  })

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const taskDetail = form.get('taskDetails')?.valueOf() as string

    mutation.mutate({ taskDetails: taskDetail, priority: 4, completed: 'No' })
    e.currentTarget.reset()
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          type="text"
          name="taskDetails"
        />
      </form>
    </>
  )
}

export default AddTodo
