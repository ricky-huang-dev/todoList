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
    mutationFn: (id: number, completedTasks: models.Complete) =>
      updateToDos(id, completedTasks),
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

  function handleCompleted(e, id) {
    e.preventDefault()
    const completedTasks = { completed: true }
    completeMutation.mutate(id, completedTasks)

    console.log(e.currentTarget)
  }

  return (
    <>
      {displayTasks.map((todo: models.Tasks) =>
        todo.completed == false ? (
          <li key={todo.id}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onClick={(e) => handleCompleted(e, todo.id)}
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
        ) : null
      )}
    </>
  )
}

export default Tasks
