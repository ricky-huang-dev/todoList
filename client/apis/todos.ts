import request from 'superagent'
import { Todos } from '../../models/todos'

export async function getAllTasks() {
  const response = await request.get('/api/v1/todos')
  console.log(response.body)

  return response.body
}
