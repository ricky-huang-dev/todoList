import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask, deleteTask, toggleCompleted } from '../apis/taskApi'
import { ITask } from '../../models/taskModel'

function useTasks() {
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (newTaskText: ITask['text']) => addTask(newTaskText),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const editMutation = useMutation({
    mutationFn: (task: ITask) => toggleCompleted(task),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (taskId: ITask['id']) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  return { addMutation, editMutation, deleteMutation }
}

export default useTasks
