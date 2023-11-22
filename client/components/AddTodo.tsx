// // eslint-disable-next-line no-unused-vars

// import { useState } from 'react'
// import { addTodo, getAllTodo } from '../apis/todoApi.tsx'
// import { useQuery } from '@tanstack/react-query'

// function AddTodo() {
//   const { isError, refetch } = useQuery({
//     queryKey: ['task'],
//     queryFn: () => getAllTodo(),
//   })

//   const [task, setTask] = useState('')

//   const handleTaskChange = (e) => {
//     setTask(e.target.value)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       await addTodo({ task })
//       refetch()
//       setTask('')
//     } catch (error) {
//       console.error('Error adding todo:', error.message)
//     }
//   }

//   const handleKeyPress = (event: { key: string }) => {
//     // If Enter key is pressed (key code 13), submit the form
//     if (event.key === 'Enter') {
//       handleSubmit(event)
//     }
//   }

//   if (isError) return <div>Error loading data</div>

//   return (
//     <>
//       <input
//         onSubmit={handleSubmit}
//         className="new-todo"
//         placeholder="What needs to be done?"
//         onChange={handleTaskChange}
//         onKeyPress={handleKeyPress}
//         autoFocus={true}
//       />
//     </>
//   )
// }

// export default AddTodo
