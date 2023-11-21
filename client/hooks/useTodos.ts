import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NewTodo, TodoTask } from '../../models/todos'
import { addTodo, deleteTask, editTask } from '../apis/todos'

function useTodos() {
  const queryClient = useQueryClient()

  const { mutate: addMutation } = useMutation({
    mutationFn: (newTodo: NewTodo['taskDetails']) => addTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(['todoTask'])
    },
  })

  const { mutate: editMutation } = useMutation({
    mutationFn: (updateTodo: TodoTask) => editTask(updateTodo),
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
