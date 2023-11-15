import request from 'superagent'

export async function getToDos() {
  return request.get('/api/v1/tasks').then((req) => req.body)
}
