import { useQuery } from '@tanstack/react-query'
import { fetchTodos } from '../apis/todos'
import { TodoTask } from '../../models/todos'
import useTodos from '../hooks/useTodos'

function TodoList() {
  const { data } = useQuery({
    queryKey: ['todoTask'],
    queryFn: fetchTodos,
  })

  function handleCompleted(task: TodoTask) {
    useTodos.editMutation.editMutation(task)
  }

  return (
    <>
      <ul className="todo-list">
        {data?.map((todoTask) => (
          <li
            key={todoTask.id}
            className={todoTask.completed ? 'completed' : ''}
          >
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={todoTask.completed}
                onChange={() => handleCompleted(todoTask)}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoList
