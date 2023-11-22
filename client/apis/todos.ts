import request from 'superagent'
import { myTask } from '../../models/taskModel'

const taskApiUrl = '/api/v1/tasks'

export async function getAllTasks() {
  const res = await request.get(`${taskApiUrl}/`)
  return res.body
}

export async function deleteTask(taskId: number) {
  return await request.delete(`${taskApiUrl}/${taskId}`)
}

export async function taskCompleted(task: myTask) {
  const res = await request
    .patch(`${taskApiUrl}/${task.id}`)
    .send({ completed: !task.completed })
  return res.body
}

export async function updateTask(task: myTask) {
  const res = await request.patch(`${taskApiUrl}/${task.id}`).send(task)
  return res.body
}

export async function addTask(taskDescription: string) {
  const res = await request
    .post(`${taskApiUrl}`)
    .send({ description: taskDescription })
  return res.body
}
