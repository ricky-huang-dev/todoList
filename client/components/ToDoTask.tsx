import { useState } from 'react'
import { AddTask } from '../../models/tasks'
import { useTasks } from './ViewTasks'

interface Props {
  task: AddTask
}

export default function ToDoTask({ task }: Props) {
  const { editMutation, completeMutation, deleteMutation } = useTasks()

  const [editing, setEditing] = useState(false)

  // const complete = useTasks('complete')
  function handleClick(task: AddTask) {
    if (task.completed === 'no') {
      task.completed = 'yes'
      // await editTasks(task.id, task)
      return completeMutation.mutate(task)
    }
    if (task.completed === 'yes') {
      task.completed = 'no'
      // await editTasks(task.id, task)
      return completeMutation.mutate(task)
    }
  }

  function handleDestroy(id: number | undefined) {
    return deleteMutation.mutate(id)
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    id: number | undefined
  ) {
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
        <li
          key={task.id}
          className={task.completed == 'yes' ? 'completed' : ''}
          tabIndex={0}
          onDoubleClick={() => setEditing(true)}
        >
          {task.taskDetails}
        </li>
        <div>
          <button className="complete" onClick={() => handleClick(task)}>
            Complete
          </button>
          <button onClick={() => handleDestroy(task.id)} className="complete">
            Delete
          </button>
          <button onClick={() => setEditing(!editing)} className="complete">
            Edit
          </button>
        </div>
      </>
    )
  else
    return (
      <>
        <form onSubmit={(e) => handleSubmit(e, task.id)}>
          <input
            onBlur={() => setEditing(false)}
            name="editTask"
            className="new-todo"
            defaultValue={`edit: ${task.taskDetails}`}
            type="text"
          />
        </form>
        <div>
          <button className="complete" onClick={() => handleClick(task)}>
            Complete
          </button>
          <button onClick={() => handleDestroy(task.id)} className="complete">
            Delete
          </button>
          <button onClick={() => setEditing(!editing)} className="complete">
            Edit
          </button>
        </div>
      </>
    )
}
