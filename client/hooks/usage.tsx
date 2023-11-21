import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo, deleteTodo, updateTodoTask } from '../apis/todoApi'
import { Todos } from '../models/Todos'

function useTasks() {
  const queryClient = useQueryClient()

  const { mutate: addMutation } = useMutation({
    mutationFn: (newTaskText: Todos['text']) => addTodo(newTaskText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const { mutate: editMutation } = useMutation({
    mutationFn: (task: Todos) => updateTodoTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id: Todos['id']) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return { addMutation, editMutation, deleteMutation }
}

export default useTasks
