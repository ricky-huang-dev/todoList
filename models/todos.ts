export interface NewTodo {
  taskDetails: string
  completed: boolean
  priority: number
}

export interface TodoTask extends NewTodo {
  id: number
}
