export interface Tasks {
  tasks: any
  id: number
  details: string
  priority: string
  completed: boolean
}

export interface AddTask {
  details: string
  priority: string
  completed: boolean
}

export interface UpdateTask {
  details: string
  priority: string
  completed: boolean
}
