import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllTasks, taskDelete, taskDone } from '../apis/clientApi'
import { Task } from '../../models/taskModels'

function GetTasks() {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await getAllTasks()
      return response
    },
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ done, task_id }: { done: boolean; task_id: number }) =>
      taskDone(done, task_id),

    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const mutationDelete = useMutation({
    mutationFn: ({ id }: { id: number }) => taskDelete(id),

    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  if (isLoading) {
    return (
      <>
        <p>Still loading.....</p>
      </>
    )
  }

  async function handleTaskDone(
    e: React.ChangeEvent<HTMLInputElement>,
    task_id: number
  ) {
    e.preventDefault()
    const newValue = e.target.checked

    mutation.mutate({ done: newValue, task_id })
  }

  function deleteTask(id: number) {
    mutationDelete.mutate({ id })
  }

  return (
    <>
      {data?.map((item: Task) => (
        <div key={item.id}>
          <li className={item.completed === true ? 'completed' : ''}>
            <fieldset>
              <legend></legend>
              <label htmlFor={item.id.toString()}>
                <input
                  type="checkbox"
                  name="taskDone"
                  id={item.id.toString()}
                  checked={item.completed}
                  onChange={(e) => handleTaskDone(e, item.id)}
                />
                {item.taskDetails}
              </label>
            </fieldset>

            <button onClick={() => deleteTask(item.id)} className="destroy">
              x
            </button>
          </li>
        </div>
      ))}
      ,
    </>
  )
}

export default GetTasks
