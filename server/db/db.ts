import connection from './connection'
import { AddTask, UpdateTask } from '../../Models/tasks'

export function listTasks(db = connection) {
  return db('tasks').select()
}

export function addTask(newTask: AddTask, db = connection) {
  return db('tasks').insert(newTask)
}

export function completeTask(id: number, completed: boolean, db = connection) {
  return db('tasks').where('id', id).update(completed)
}

export function updateTask(id: number, data: UpdateTask, db = connection) {
  return db('tasks').where('id', id).update(data)
}

export function deleteTask(id: number, db = connection) {
  return db('tasks').where({ id }).del()
}
