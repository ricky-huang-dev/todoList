import db from './connection'

export interface NewTodo {
  taskDetails: string
  completed: string
  priority: number
}

export interface TodoTask extends NewTodo {
  id: number
}
export async function getTodos() {
  return (await db('todos')
    .select('id', 'taskDetails', 'completed', 'priority')
    .orderBy('priority')) as TodoTask[]
}

export async function addTodo(newTask: NewTodo) {
  return await db('todos').insert(newTask)
}
