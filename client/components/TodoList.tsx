import { useQuery } from '@tanstack/react-query'
import { getTodoList } from '../apis/todos'

export default function TodoList() {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodoList(),
  })
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>ERROR</h2>
  }
  return (
    <>
      {todos.map((todo) => (
        <p key={todo.todoId}>{todo.task}</p>
      ))}
    </>
  )
}
