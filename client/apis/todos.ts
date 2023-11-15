import request from 'superagent'
import { Todos } from '../../models/todos'

export async function getAllTasks() {
  const response = await request.get('/api/v1/todos')

  return response.body as Todos[]
}

export async function deleteTask(id: number) {
  return await request.delete(`/api/v1/todos/${id}`)
}

export async function addTask(taskDetails: string) {
  return await request.post(`/api/v1/todos/`).send({ taskDetails })
}

interface Props {
  id: number
  taskDetails: string
}
export async function editTask({ id, taskDetails }: Props) {
  return await request.patch(`/api/v1/todos/${id}`).send({ taskDetails })
}
