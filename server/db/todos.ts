import db from './connection'
import { NewTodo, TodoTask } from '../../models/todos'

export async function getTodos() {
  return (await db('todos')
    .select('id', 'taskDetails', 'completed', 'priority')
    .orderBy('priority')) as TodoTask[]
}

export async function addTodo(newTask: NewTodo) {
  return await db('todos').insert(newTask)
}

export async function updateTodo(id: number, updateTask: TodoTask) {
  return db('todos').where({ id }).update(updateTask)
}

export async function deleteTodo(id: number) {
  return db('todos').where({ id }).del()
}
