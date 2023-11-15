import request from 'superagent'
import { ITask } from '../../models/taskModel'

const taskApiUrl = '/api/v1/tasks'

export async function getTasks(): Promise<ITask[]> {
  const res = await request.get(`${taskApiUrl}`)
  return res.body
}

export async function toggleCompleted(task: ITask): Promise<ITask> {
  const res = await request
    .patch(`${taskApiUrl}/${task.id}`)
    .send({ completed: !task.completed })
  return res.body
}

export async function addTask(taskText: ITask['text']): Promise<ITask> {
  const res = await request.post(`${taskApiUrl}`).send({ text: taskText })
  return res.body
}

export async function deleteTask(taskId: ITask['id']): Promise<void> {
  await request.delete(`${taskApiUrl}/${taskId}`)
}
