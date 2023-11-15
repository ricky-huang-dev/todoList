import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTask, deleteTask, editTasks, getAllTasks } from '../apis/apiClient'
import { AddTask } from '../../models/tasks'
import { useState } from 'react'
import ToDoTask from './ToDoTask'

{
  /* <!-- These are here just to show the structure of the list items -->
  <!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */
}

export function useTasks() {
  const queryClient = useQueryClient()

  const completeMutation = useMutation({
    mutationFn: (task: AddTask) => editTasks(task),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const addMutation = useMutation({
    mutationFn: (task: AddTask) => addTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const editMutation = useMutation({
    mutationFn: (task: AddTask) => editTasks(task),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  return { completeMutation, deleteMutation, addMutation, editMutation }
}

function ViewTasks() {
  const { completeMutation, deleteMutation, editMutation } = useTasks()

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

  function handleDestroy(id: number) {
    console.log(id)
    return deleteMutation.mutate(id)
  }

  // function handleDoubleClick(task) {
  //   return editMutation.mutate(task)
  // }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
  })

  if (isError) {
    return <p>There is an error sorry!</p>
  }

  if (isLoading) {
    return <p>Your page is loading...</p>
  }

  return (
    <>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {data.map((task) => {
          return (
            <>
              <li
                key={task.id}
                className={task.completed == 'yes' ? 'completed' : ''}
              >
                <div className="view">
                  {/* <input
                    className="toggle"
                    type="checkbox"
                    checked={task.completed === 'yes'}
                  /> */}
                  <div>
                    <button onClick={() => handleClick(task)}>
                      <ToDoTask task={task} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDestroy(task.id)}
                    className="destroy"
                  ></button>
                </div>
              </li>
            </>
          )
        })}
      </ul>
    </>
  )
}

export default ViewTasks
