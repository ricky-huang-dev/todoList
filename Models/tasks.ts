export interface AddTask {
  details: string
  priority: string
  completed: boolean
}

export interface UpdateTask {
  id: number
  details: string
  priority: string
  completed: boolean
}
