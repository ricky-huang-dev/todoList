import { useQuery } from '@tanstack/react-query'
import { fetchTodos } from '../apis/todos'
import { TodoTask } from '../../models/todos'
import useTodos from '../hooks/useTodos'
import TodoDetails from './TodoDetails'

function TodoList() {
  const { data } = useQuery({
    queryKey: ['todoTask'],
    queryFn: fetchTodos,
    select: (data) =>
      data
        .sort((a, b) => a.taskDetails.localeCompare(b.taskDetails)) // sort alphabetically
        .sort((a, b) => Number(a.completed) - Number(b.completed)), // sort by completed
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
              <label id="checkNewtodo">
                to do
                <input
                  id="checkList"
                  className="toggle"
                  type="checkbox"
                  checked={todoTask.completed}
                  onChange={() => handleCompleted(todoTask)}
                />
              </label>
              <TodoDetails todoJob={todoTask} />
              <button
                name="destroy"
                className="destroy"
                onClick={() => handleDeleteTask(todoTask.id)}
              >
                btn
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoList
