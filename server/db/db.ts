import { EditTask, NewTask } from '../../models/tasks'
import db from './connection'

export function getAllTasks() {
  return db('tasks').select(
    'id',
    'task_details as taskDetails',
    'priority',
    'completed'
  )
}

export function addATask(newTask: NewTask) {
  return db('tasks').insert(newTask)
}

export function editTask(id: number, updatedTask: EditTask) {
  return db('tasks').where('id', id).update(updatedTask)
}

export function deleteTask(id: number) {
  return db('tasks').where('id', id).delete()
}
