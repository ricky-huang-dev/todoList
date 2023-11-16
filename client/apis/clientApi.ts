import request from 'superagent'
import { Tasks, UpdateTask } from '../../Models/tasks'

export async function getToDos() {
  return await request.get('/api/v1/tasks').then((req) => req.body)
}

export async function addToDos(details: string) {
  const newToDo = {
    details: details,
    priority: null,
    completed: false,
  }

  return await request.post(`/api/v1/tasks/`).send(newToDo)
}

export async function updateToDos(completedTask: Tasks) {
  await request.patch(`/api/v1/tasks/${completedTask.id}`).send(completedTask)
}

export async function deleteToDos(id: number) {
  return await request.delete(`/api/v1/tasks/${id}`)
}
