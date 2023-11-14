import connection from '../db/connection'
import { ITask } from '../db/models/taskModel'

export async function getTasks(): Promise<ITask[]> {
  return await connection('tasks').select()
}
