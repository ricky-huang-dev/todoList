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
      <form id="taskDetails" onSubmit={handleSubmit}>
        <label htmlFor="taskDetails">
          New Task:
          <input
            id="taskDetails"
            name="taskDetails"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </label>
      </form>
    </>
  )
}

export default AddTodo
