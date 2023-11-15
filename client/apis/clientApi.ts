import request from 'superagent'

export async function getToDos() {
  return await request.get('/api/v1/tasks').then((req) => req.body)
}

export async function deleteToDos(id: number) {
  await request.delete(`/api/v1/tasks/${id}`)
}

export async function addToDos(details: string) {
  const newToDo = {
    details: details,
    priority: null,
    completed: false,
  }

  return await request.post(`/api/v1/tasks/`).send(newToDo)
}
