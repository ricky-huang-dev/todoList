export interface Task {
    id: number
    priority: number
    task: string
    task_Details: string
    completed: boolean
  }
  export interface TaskFilter {
    id: number
    priority: number
    task: string
    task_Details: string
    completed: boolean
  }
  
  export interface UpdateTask {
    priority: number
    task: string
    task_Details: string
    completed: boolean
  }
  
  export interface NewTask {
    task: string
  }
  
  export interface Completed {
    completed: boolean
  }