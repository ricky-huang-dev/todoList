import db from './connection.ts'

export async function getAllTasks() {
  return db('todosTable').select()
}

export async function addTask(taskDetails: string) {
  return db('todosTable').insert({ taskDetails })
}

export async function deleteTask(id: number) {
  return db('todosTable').where({ id }).del()
}
interface TaskItems {
  id: number
  taskDetails?: string
  completed?: number
}
export async function editTask(taskItems: TaskItems) {
  const { id, taskDetails, completed } = taskItems
  return db('todosTable').where({ id }).update({ taskDetails, completed })
}
