import React from 'react'
import * as models from '../../Models/tasks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteToDos, updateToDos } from '../apis/clientApi'
import { useState } from 'react'

interface Props {
  tasks: any
}

function Tasks(props: Props) {
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteToDos(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const completeMutation = useMutation({
    mutationFn: (completedTasks: models.Tasks) => updateToDos(completedTasks),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const queryClient = useQueryClient()

  const displayTasks = props.tasks

  function handleDelete(e: React.MouseEvent<HTMLElement>, id: number) {
    e.preventDefault()
    deleteMutation.mutate(id)
  }

  function handleCompleted(tasks: models.Tasks) {
    const completedTasks = { ...tasks, completed: true }
    completeMutation.mutate(completedTasks)
  }

  function handleUncompleted(tasks: models.Tasks) {
    const completedTasks = { ...tasks, completed: false }
    completeMutation.mutate(completedTasks)
  }

  return (
    <>
      {displayTasks.map((todo: models.Tasks) => (
        <li key={todo.id}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onClick={() =>
                todo.completed == false
                  ? handleCompleted(todo)
                  : handleUncompleted(todo)
              }
              defaultChecked={todo.completed}
            />

            <label>{todo.details}</label>
            <button
              onClick={(e) => handleDelete(e, todo.id)}
              className="destroy"
            ></button>
          </div>

          <input className="edit" value="Rule the web" />
        </li>
      ))}
    </>
  )
}

export default Tasks
