import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo, deleteTodo, updateTodo } from '../apis/todoApi'

export default function useTodo() {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTodo({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['task'])
    },
  })

  const editMutation = useMutation({
    mutationFn: ({ id, newTask }: { id: number; newTask: string }) =>
      updateTodo({ id, newTask }),
    onSuccess: () => {
      queryClient.invalidateQueries(['task'])
    },
  })

  const addMutation = useMutation({
    mutationFn: ({ task }: { task: string }) => addTodo({ task }),
    onSuccess: () => {
      queryClient.invalidateQueries(['task'])
    },
  })

  return { deleteMutation, editMutation, addMutation }
}
