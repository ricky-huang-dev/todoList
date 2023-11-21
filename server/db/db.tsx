import { Todos } from '../../client/models/Todos.tsx'
import db from './connection.ts'

export async function getAllTodo(): Promise<Todos[]> {
  return db('todo').select('*')
}

export async function getTodoById(id: number): Promise<Todos | undefined> {
  return db('todo').where({ id }).first()
}

export async function addTodo(
  task: string,
  status: string,
  deadline: number,
  description: string
): Promise<Todos> {
  return db('todo')
    .insert({ task, status, deadline, description })
    .returning(['id', 'task', 'status', 'deadline', 'description'])
}

export async function updateTodoTask(
  id: number,
  task: string,
  status: string,
  deadline: number,
  description: string
): Promise<Todos | undefined> {
  return db('todo')
    .where({ id })
    .update({ task, status, deadline, description })
    .returning(['id', 'task', 'status', 'deadline', 'description'])
}

export async function deleteTodo(id: number): Promise<void> {
  await db('todo').where({ id }).delete()
}
