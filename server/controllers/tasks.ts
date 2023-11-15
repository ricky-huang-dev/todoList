import db from '../db/connection'
import { ITask } from '../../models/taskModel'

export async function getTasks(): Promise<ITask[]> {
  return await db('tasks').select()
}

export async function addTask(task: ITask): Promise<ITask[]> {
  return await db('tasks').insert(task).returning('*')
}

export async function updateTask(
  taskId: ITask['id'],
  task: ITask
): Promise<ITask[]> {
  return await db('tasks').where('id', taskId).update(task).returning('*')
}

export async function deleteTask(taskId: ITask['id']): Promise<void> {
  return await db('tasks').where('id', taskId).del()
}
