import { useQuery } from '@tanstack/react-query'
import AddTodo from './AddTodo.tsx'
import Footer from './Footer.tsx'
import MainSection from './Main.tsx'
import { getAllTasksApi } from '../apis/taskApi.ts'


 function App() {
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTasksApi,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <>
        <MainSection tasks={tasks} />
      </>
      <Footer tasks={tasks} />
    </>
  )
}

export default App