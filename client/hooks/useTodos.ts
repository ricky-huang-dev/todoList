import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Todo } from '../../models/Todo'
import { deleteTodo } from '../apis/todos'

function useTodos() {
  const queryClient = useQueryClient()

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (todoId: Todo['todoId']) => deleteTodo(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })
  return { deleteMutation }
}

export default useTodos
