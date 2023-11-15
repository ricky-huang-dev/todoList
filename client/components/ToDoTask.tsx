import { useState } from 'react'
import { AddTask } from '../../models/tasks'
import { useTasks } from './ViewTasks'

export default function ToDoTask({ task }: { task: AddTask }) {
  const [editing, setEditing] = useState(false)

  const { editMutation } = useTasks()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, id: number) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const taskDetails = form.get('editTask')?.valueOf() as string

    const task = {
      id,
      priority: 'non-urgent',
      taskDetails,
      completed: 'no',
    }

    editMutation.mutate(task)
    setEditing(false)
  }

  if (editing === false)
    return (
      <>
        <label onDoubleClick={() => setEditing(true)}>{task.taskDetails}</label>
      </>
    )
  else
    return (
      <form onSubmit={(e) => handleSubmit(e, task.id)}>
        <input
          onBlur={() => setEditing(false)}
          name="editTask"
          className="new-todo"
          defaultValue={task.taskDetails}
          type="text"
        />
      </form>
    )
}
