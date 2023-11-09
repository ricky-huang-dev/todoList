import { useQuery } from '@tanstack/react-query'
import { fetchTodos } from '../apis/todos'

function TodoList() {
  const { data } = useQuery({
    queryKey: ['todoTask'],
    queryFn: fetchTodos,
  })
  console.log(data)

  return (
    <>
      <ul className="todo-list">
        {data?.map((todoTask) =>
          todoTask.completed === 'No' ? (
            <li key={todoTask.id}>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>{todoTask.taskDetails}</label>
                <button className="destroy"></button>
              </div>
            </li>
          ) : (
            <li className="completed" key={todoTask.id}>
              <div className="view">
                <input className="toggle" type="checkbox" checked />
                <label>{todoTask.taskDetails}</label>
                <button className="destroy"></button>
              </div>
            </li>
          )
        )}
      </ul>
    </>
  )
}

export default TodoList
