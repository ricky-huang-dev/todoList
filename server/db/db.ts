import db from './connection.ts'

export async function getAllTasks() {
  return db('todosTable').select()
}
