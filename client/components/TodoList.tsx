import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTodoList } from '../apis/todos'
import TodoItem from './TodoItem'
import { Todo } from '../../models/Todo'
import useTodos from '../hooks/useTodos'

export default function TodoList() {
  const { deleteMutation } = useTodos()

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
  } else if (isError) {
    return <h2>ERROR</h2>
  }

  function handleDelete(todoId: Todo['todoId']) {
    deleteMutation(todoId)
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.todoId}>
          <TodoItem task={todo.task} />
          <button name="delete" onClick={() => handleDelete(todo.todoId)}>
            X
          </button>
        </li>
      ))}
    </ul>
  )
}
