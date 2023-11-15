import request from 'superagent'
import type { NewTask, EditTask, AddTask } from '../../models/tasks'

export async function getAllTasks() {
  const response = await request.get('/api/v1/tasks')
  return response.body as AddTask[]
}

export async function editTasks(task: AddTask) {
  await request.patch(`/api/v1/tasks/${task.id}`).send(task)
}

export async function addTask(task: AddTask) {
  await request.post('/api/v1/tasks').send(task)
}

export async function deleteTask(id: number) {
  await request.delete(`/api/v1/tasks/${id}`)
}
