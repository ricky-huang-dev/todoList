import request from 'superagent'
import { TodoTask, NewTodo } from '../../models/todos'
import { updateTodo } from '../../server/db/todos'

const baseUrl = '/api/v1/todos'

export async function fetchTodos() {
  const res = await request.get(baseUrl)
  return res.body as TodoTask[]
}

export async function addTodo(newTodo: NewTodo['taskDetails']) {
  const res = await request.post(baseUrl).send({ taskDetails: newTodo })
  return res.body
}

export async function deleteTask(id: number) {
  await request.delete(`${baseUrl}/${id}`)
}

export async function editTask(updtateTodo: TodoTask) {
  const res = await request
    .patch(`${baseUrl}/${updtateTodo.id}`)
    .send(updateTodo)
  return res.body
}

export async function taskCompleted(task: TodoTask): Promise<TodoTask> {
  const res = await request
    .patch(`${baseUrl}/${task.id}`)
    .send({ completed: !task.completed })
  return res.body
}
