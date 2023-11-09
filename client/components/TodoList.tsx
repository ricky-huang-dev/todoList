import { useQuery } from '@tanstack/react-query'
import { fetchTodos } from '../apis/todos'

import CompletedTask from './CompletedTask'
import UncompletedTask from './UncompletedTask'

function TodoList() {
  const { data } = useQuery({
    queryKey: ['todoTask'],
    queryFn: fetchTodos,
  })

  return (
    <>
      <ul className="todo-list">
        {data?.map((todoTask) =>
          todoTask.completed ? (
            <CompletedTask
              key={todoTask.id}
              id={todoTask.id}
              taskDetails={todoTask.taskDetails}
            />
          ) : (
            <UncompletedTask
              key={todoTask.id}
              id={todoTask.id}
              taskDetails={todoTask.taskDetails}
            />
          )
        )}
      </ul>
    </>
  )
}

export default TodoList
