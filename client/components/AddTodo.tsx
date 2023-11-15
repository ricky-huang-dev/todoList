import { useTasks } from './ViewTasks'

// eslint-disable-next-line no-unused-vars
function AddTodo() {
  const { addMutation } = useTasks()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const taskDetails = form.get('taskDetails')?.valueOf() as string

    const task = {
      priority: 'non-urgent',
      taskDetails,
      completed: 'no',
    }
    addMutation.mutate(task)
    e.currentTarget.reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="taskDetails"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
        />
      </form>
    </>
  )
}

export default AddTodo
