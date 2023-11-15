import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask, deleteTask, updateTask } from '../apis/taskApi'
import { ITask } from '../../models/taskModel'

function useTasks() {
  const queryClient = useQueryClient()

  const { mutate: addMutation } = useMutation({
    mutationFn: (newTaskText: ITask['text']) => addTask(newTaskText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const { mutate: editMutation } = useMutation({
    mutationFn: (task: ITask) => updateTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (taskId: ITask['id']) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return { addMutation, editMutation, deleteMutation }
}

export default useTasks
