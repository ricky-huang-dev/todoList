export interface NewTodo {
  taskDetails: string
  completed: string
  priority: number
}

export interface TodoTask extends NewTodo {
  id: number
}
