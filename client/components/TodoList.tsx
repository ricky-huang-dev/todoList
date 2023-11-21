import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTodoList } from '../apis/todos'
import TodoItem from './TodoItem'
import { Todo } from '../../models/Todo'
import useTodos from '../hooks/useTodos'

export default function TodoList() {
  const { deleteMutation, updateMutation } = useTodos()
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
    return <h2>Something is wrong</h2>
  }

  function handleDelete(todoId: Todo['todoId']) {
    deleteMutation(todoId)
  }

  function handleComplete(todo: Todo) {
    updateMutation({ ...todo, completed: !todo.completed })
  }

  return (
    <section className="main">
      <ul>
        {todos.map((todo) => (
          <div key={todo.todoId} className="view">
            <input
              className="toggle"
              onChange={() => handleComplete(todo)}
              type="checkbox"
              checked={todo.completed}
            />
            <TodoItem todo={todo} />
            <button
              className="destroy visually-hidden"
              onClick={() => handleDelete(todo.todoId)}
            >
              X
            </button>
          </div>
        ))}
      </ul>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </section>
  )
}
