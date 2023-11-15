import connection from './connection'

const db = connection

export function getTasks() {
  return db('tasks').select()
}

// function thatr adds a new task
export function addTask() {
  return db('tasks')
}

// function that updates a task
export function updateTask(id: number, task: string) {
  return db('tasks').where('id', id).update({ task: task })
}

// function that deletes as task
export function deleteTask(id: number) {
  return db('tasks').where('id', id).delete()
}
