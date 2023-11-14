import connection from './connection'

const db = connection

export function getTasks() {
  return db('tasks').select()
}
