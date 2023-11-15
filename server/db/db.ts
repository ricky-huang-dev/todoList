import connection from './connection'

interface Todo {
  id: number
  task: string
  completed: boolean
}

const db = connection

export function getTasks() {
  return db('tasks').select()
}

// function thatr adds a new task
export function addTask(newTask: Todo) {
  return db('tasks').insert(newTask)
}

// function that updates a task
export function updateTask(id: number, task: string) {
  return db('tasks').where('id', id).update({ task: task })
}

// function that deletes as task
export function deleteTask(id: number) {
  return db('tasks').where('id', id).delete()
}

// export function getTask(id: number) {
//   return db('tasks').select('id', 'task').where('id', id)
// }
