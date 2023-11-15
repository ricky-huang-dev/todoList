export interface NewTodo {
  task: string
  priority: string
  completed: boolean
}
export interface Todo extends NewTodo {
  todoId: number
}
