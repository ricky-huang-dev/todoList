import db from '../db/connection'
import { myTask } from '../../models/taskModel'

export async function getTasks() {
  return await db('tasks').select()
}

export async function addTask(task: myTask) {
  return await db('tasks').insert(task).returning('*')
}

export async function updateTask(taskId: number, task: myTask) {
  return await db('tasks').where('id', taskId).update(task).returning('*')
}

export async function deleteTask(taskId: number) {
  return await db('tasks').where('id', taskId).del()
}
