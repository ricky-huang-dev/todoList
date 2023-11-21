import { useQuery } from '@tanstack/react-query'
import { fetchTodos } from '../apis/todos'
import { TodoTask } from '../../models/todos'
import useTodos from '../hooks/useTodos'
import TodoDetails from './TodoDetails'

function TodoList() {
  const { data } = useQuery({
    queryKey: ['todoTask'],
    queryFn: fetchTodos,
  })
  const { editMutation, deleteMutation } = useTodos()

  function handleCompleted(task: TodoTask) {
    editMutation({ ...task, completed: !task.completed })
  }

  function handleDeleteTask(taskId: TodoTask['id']) {
    const shouldDelete = window.confirm('Delete this task?')
    if (shouldDelete) deleteMutation(taskId)
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
              <TodoDetails todoJob={todoTask} />
              <button
                name="destroy"
                className="destroy"
                onClick={() => handleDeleteTask(todoTask.id)}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoList
