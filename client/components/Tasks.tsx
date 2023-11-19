import React from 'react'
import * as models from '../../Models/tasks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteToDos, updateToDos, completedToDos } from '../apis/clientApi'
import { useState } from 'react'

function Tasks(props: models.Tasks) {
  const [editing, setEditing] = useState(false)
  const [task, setTask] = useState(props.details)
  const [currentTask, setCurrentTask] = useState()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteToDos(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const completeMutation = useMutation({
    mutationFn: (completedTasks: models.Tasks) =>
      completedToDos(completedTasks),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const editMutation = useMutation({
    mutationFn: (tasks: models.UpdateTask) => updateToDos(tasks),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  function handleDelete(e: React.MouseEvent<HTMLElement>, id: number) {
    e.preventDefault()
    deleteMutation.mutate(id)
  }

  function handleCompleted(todos: models.Tasks) {
    const completedTasks = { ...todos, completed: !todos.completed }
    completeMutation.mutate(completedTasks)
  }

  function handleEditState(editing: boolean, todo: models.UpdateTask) {
    setEditing(editing)
    setCurrentTask(todo)
  }

  function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const details = form.get('updateTask')?.valueOf() as string

    const updatedTask = {
      id: currentTask.id,
      priority: 'low',
      details,
      completed: false,
    }

    console.log('this is for update', updatedTask)
    editMutation.mutate(updatedTask)
    setEditing(false)
  }

  function fullData() {
    return (
      <>
        {props.tasks?.map((todo: models.Tasks) => (
          <li key={todo.id}>
            <div className="view">
              <input
                id={`complete-${todo.id}`}
                className="toggle"
                type="checkbox"
                onChange={() => handleCompleted(todo)}
                checked={todo.completed}
              />

              <label
                htmlFor={`complete-${todo.id}`}
                onDoubleClick={() => handleEditState(!editing, todo)}
              >
                {todo.details}
              </label>

              <button
                onClick={(e) => handleDelete(e, todo.id)}
                className="destroy"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </>
    )
  }

  return (
    <div>
      {editing ? (
        <form onSubmit={(e) => handleEditSubmit(e)}>
          <input
            type="text"
            className="new-todo"
            name="updateTask"
            defaultValue={currentTask.details}
            onChange={(e) => setTask(e.target.value)}
          />
          {fullData()}
        </form>
      ) : (
        fullData()
      )}
    </div>
  )
}

export default Tasks
