import request from 'superagent'

export async function getTodos() {
  const response = await request.get('/api/v1/todos')
  return response.body
}

export async function deleteTodo(id: number) {
  await request.delete(`/api/v1/todos/${id}`)
}

export async function addTodo(details: string) {
  const newTodo = {
    details: details,
    priority: null,
    completed: false,
  }
  await request.post(`/api/v1/todos`).send(newTodo)
}

export async function updateTodo(id: number, updatedTodo: object) {
  await request.patch(`/api/v1/todos/${id}`).send(updatedTodo)
}
