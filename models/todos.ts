export interface Todos {
  id: number
  taskDetails: string
  priority: number
  completed: boolean
}

export interface TaskItems {
  id: number
  taskDetails?: string
  completed?: boolean
}
