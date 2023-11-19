import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NewTodo, TodoTask } from '../../models/todos'
import { addTodo, deleteTask, editTask } from '../apis/todos'

function useTodos() {
  const queryClient = useQueryClient()

  const { mutate: addMutation } = useMutation({
    mutationFn: (newTodo: NewTodo) => addTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(['todoTask'])
    },
  })

  const { mutate: editMutation } = useMutation({
    mutationFn: ({ id, newTodo }: { id: string; newTodo: string }) =>
      editTask(id, newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(['todoTask'])
    },
  })

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id: TodoTask['id']) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todoTask'])
    },
  })
  return { addMutation, editMutation, deleteMutation }
}

export default useTodos
