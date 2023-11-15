import request from 'superagent'

export async function getTodos() {
  const response = await request.get('/api/v1/todos')
  return response.body
}

export async function deleteTodo(id: number) {
  await request.delete(`/api/v1/todos/${id}`)
}
