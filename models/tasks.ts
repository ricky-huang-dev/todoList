export interface NewTask {
  task_details: string
  priority: string
  completed: string
}

export interface EditTask extends NewTask {
  id: number
}
