import request from 'superagent'
import { NewTask, Task } from '../models/models'

export async function getAllTasksApi() {
  const response = await request.get('/api/v1/todos')

  return response.body
}
export async function addTodoApi(task: NewTask) {
  try {
    await request.post('/api/v1/todos/').send(task)
  } catch (error) {
    console.error(error)
  }
}
export async function updateTodoApi(completedTask: Task) {
  try {
    console.log(completedTask)
    await request.patch(`/api/v1/todos/${completedTask.id}`).send(completedTask)
  } catch (error) {
    console.error(error)
  }
}

export async function deleteTaskApi(id: number) {
  const response = await request.delete(`/api/v1/todos/${id}`)

  return response.body
}