import connection from './connection.ts'

import { newTodo } from '../../model/todos.ts'

export async function getTodos(db = connection) {
  return await db('todos').select()
}

export async function addTodo(newTodo: newTodo, db = connection) {
  await db('todos').insert(newTodo)
}

export async function deleteTodo(id: number, db = connection) {
  await db('todos').where('id', id).del()
}

export async function updateTodo(
  id: number,
  newTodo: newTodo,
  db = connection
) {
  await db('todos').where('id', id).update(newTodo)
}
