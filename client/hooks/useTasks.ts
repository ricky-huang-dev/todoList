import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask, deleteTask, updateTask } from '../apis/todos'
import { myTask } from '../../models/taskModel'

function useTasks() {
  const queryClient = useQueryClient()

  const { mutate: addMutation } = useMutation({
    mutationFn: (newTaskText: myTask['description']) => addTask(newTaskText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const { mutate: editMutation } = useMutation({
    mutationFn: (task: myTask) => updateTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return { addMutation, editMutation, deleteMutation }
}

export default useTasks
