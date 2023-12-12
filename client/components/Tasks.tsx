import React, { useState } from 'react'
import * as models from '../models/models'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTaskApi, updateTodoApi } from '../apis/taskApi'


interface Props {
  tasks: models.Task[]
}

const emptyTask = {
  id: 0,
  priority: 0,
  task: '',
  task_Details: '',
  completed: false,
}

function Task(prop: Props) {
  const [editMode, setEditMode] = useState(false)
  const [edittedTask, setEdittedTask] = useState(emptyTask)

  const mutateDeleteTask = useMutation({
    mutationFn: (id: number) => deleteTaskApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const mutateCompleteTask = useMutation({
    mutationFn: (completedTask: models.Task) => updateTodoApi(completedTask),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const mutateUpdateTask = useMutation({
    mutationFn: (updatedTask: models.Task) => updateTodoApi(updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const queryClient = useQueryClient()

  const allTasks = prop.tasks

  function handleClick(e: React.MouseEvent<HTMLButtonElement>, id: number) {
    e.preventDefault()
    mutateDeleteTask.mutate(id)
  }

  function handleCompleteClick(task: models.Task) {
    const completedTask = { ...task, completed: !task.completed }
    mutateCompleteTask.mutate(completedTask)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const task = form.get('edittedTaskValue')?.valueOf() as string
    const updatedTask = { ...edittedTask, task }
    mutateUpdateTask.mutate(updatedTask)
    e.currentTarget.reset()
    setEditMode(false)
  }

  function handleEditClick(task: models.Task) {
    setEditMode(!editMode)
    setEdittedTask(task)
    console.log(task.id)
  }

  function createMappedData() {
    return (allTasks.map((task: models.Task) => (
      <div key={task.id}>
        <li key={task.id}>
          <div className="view">
          
            <input
              id={`checkbox-${task.id}`}
              onClick={() => handleCompleteClick(task)}
              className="toggle"
              type="checkbox"
              defaultChecked={task.completed}
            />
            <label
              htmlFor={`checkbox-${task.id}`}
              onDoubleClick={() => handleEditClick(task)}
            >
              {task.task}
            </label>
            <button
              onClick={(e) => handleClick(e, task.id)}
              className="destroy visually-hidden"
            >
              X
            </button>
          </div>

        </li>
      </div>
    ))
  )}

  return editMode ? (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="edittedTaskValue">Edit your task</label>
        <input
          className="new-todo currentlyEditting"
          onDoubleClick={() => setEditMode(!editMode)}
          id="edittedTaskValue"
          name="edittedTaskValue"
          defaultValue={edittedTask.task}
        ></input>
      </form>

      {createMappedData()}
    </>
  ) : (
    createMappedData()
  )
}

export default Task