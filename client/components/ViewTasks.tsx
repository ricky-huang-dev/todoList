import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTask, deleteTask, editTasks, getAllTasks } from '../apis/apiClient'
import { AddTask } from '../../models/tasks'
import ToDoTask from './ToDoTask'

{
  /* <!-- These are here just to show the structure of the list items -->
  <!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */
}

export function useTasks() {
  const queryClient = useQueryClient()

  const completeMutation = useMutation({
    mutationFn: (task: AddTask) => editTasks(task),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number | undefined) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const addMutation = useMutation({
    mutationFn: (task: AddTask) => addTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const editMutation = useMutation({
    mutationFn: (task: AddTask) => editTasks(task),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  return { completeMutation, deleteMutation, addMutation, editMutation }
}

function ViewTasks() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
  })

  if (isError) {
    return <p>There is an error sorry!</p>
  }

  if (isLoading) {
    return <p>Your page is loading...</p>
  }

  return (
    <>
      <ul className="todo-list">
        {data.map((task) => {
          return (
            <>
              <li>
                <div className="view">
                  <ToDoTask task={task} />
                </div>
              </li>
            </>
          )
        })}
      </ul>
    </>
  )
}

export default ViewTasks
