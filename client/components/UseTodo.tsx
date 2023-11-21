import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo, deleteTodo, updateTodoTask } from '../apis/todoApi'

export default function useTodo() {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTodo({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['task'])
    },
  })

  const editMutation = useMutation({
    mutationFn: ({
      id,
      newTask,
      newStatus,
      newDeadline,
      newDescription,
    }: {
      id: number
      newTask: string
      newStatus: string
      newDeadline: number
      newDescription: string
    }) =>
      updateTodoTask({ id, newTask, newStatus, newDeadline, newDescription }),
    onSuccess: () => {
      queryClient.invalidateQueries(['input'])
    },
  })

  const addMutation = useMutation({
    mutationFn: ({
      task,
      status,
      deadline,
      description,
    }: {
      task: string
      status: string
      deadline: number
      description: string
    }) => addTodo({ task, status, deadline, description }),
    onSuccess: () => {
      queryClient.invalidateQueries(['input'])
    },
  })

  return { deleteMutation, editMutation, addMutation }
}
