import request from 'superagent'
import { TodoTask, NewTodo } from '../../models/todos'

const baseUrl = '/api/v1/todos'

export async function fetchTodos() {
  const res = await request.get(baseUrl)
  return res.body as TodoTask[]
}

export async function addTodo(newTodo: NewTodo) {
  await request.post(baseUrl).send(newTodo)
}

export async function deleteTask(id: number) {
  await request.delete(`${baseUrl}/${id}`)
}
