import request from 'superagent'
import { Todos, TaskItems } from '../../models/todos'

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

export async function editTask(taskItems: TaskItems) {
  const { id, taskDetails, completed } = taskItems
  return await request
    .patch(`/api/v1/todos/${id}`)
    .send({ taskDetails, completed })
}
