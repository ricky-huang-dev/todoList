import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Todo } from '../../models/Todo'
import { addTodo, deleteTodo } from '../apis/todos'

function useTodos() {
  const queryClient = useQueryClient()

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (todoId: Todo['todoId']) => deleteTodo(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })
  const { mutate: addMutation } = useMutation({
    mutationFn: (task: Todo['task']) => addTodo(task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })
  return { deleteMutation, addMutation }
}

export default useTodos
