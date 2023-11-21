import { useQuery } from '@tanstack/react-query'
import TodoListItem from './App.tsx'
import { getAllTodo } from '../apis/todoApi.tsx'
import AddTodo from './AddTodo.tsx'

export default function TodoList() {
  const { data: todos, isError } = useQuery({
    queryKey: ['task'],
    queryFn: () => getAllTodo(),
  })

  if (isError) return <div>Error loading data</div>

  return (
    <>
      <AddTodo />
      <div>
        <h2>TODO List</h2>
        {todos &&
          todos.map((t) => (
            <TodoListItem
              key={t.id}
              id={t.id}
              task={t.task}
              status={t.status}
              deadline={t.deadline}
              descripion={t.descripion}
            />
          ))}
      </div>
    </>
  )
}
