import connection from './connection'
import { AddTask } from '../../Models/tasks'

export function listTasks(db = connection) {
  return db('tasks').select()
}

export function addTask(newTask: AddTask, db = connection) {
  return db('tasks').insert(newTask)
}

export function updateTask(id: number, data: string, db = connection) {
  return db('tasks').where('id', id).update(data)
}

export function deleteTask(id: number, db = connection) {
  return db('tasks').where({ id }).del()
}
