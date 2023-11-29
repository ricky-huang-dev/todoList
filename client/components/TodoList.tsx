import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllTodo, addTodo } from '../apis/todoApi.tsx'
import TodoPage from './TodoPage.tsx'
// import AddTodo from './AddTodo.tsx'

export default function TodoList() {
  const {
    data: todos,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['task'],
    queryFn: () => getAllTodo(),
  })

  const [task, setTask] = useState('')

  const handleTaskChange = (e) => {
    setTask(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addTodo({ task })
      refetch()
      setTask('')
    } catch (error) {
      console.error('Error adding todo:', error.message)
    }
  }

  const handleKeyPress = (event: { key: string }) => {
    // If Enter key is pressed (key code 13), submit the form
    if (event.key === 'Enter') {
      handleSubmit(event)
    }
  }

  if (isError) return <div>Error loading data</div>

  return (
    <>
      <div>
        <label htmlFor="taskInput">Add task</label>
        <input
          id="taskInput"
          onSubmit={handleSubmit}
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          value={task}
          onChange={handleTaskChange}
          onKeyPress={handleKeyPress} // Handle Enter key press
        />
      </div>
      <div className="list">
        {todos &&
          todos.map((t) => (
            <TodoPage
              key={t.id}
              id={t.id}
              task={t.task}
              completed={t.completed}
            />
          ))}
      </div>
    </>
  )
}
