import { Todos } from '../../client/models/Todos.tsx'
import db from './connection.ts'

export async function getAllTodo(): Promise<Todos[]> {
  return db('todo').select('*')
}

export async function getTodoById(id: number): Promise<Todos | undefined> {
  return db('todo').where({ id }).first()
}

export async function addTodo(task: string): Promise<Todos> {
  return db('todo').insert(task)
}

export async function updateTodoTask(
  id: number,
  task: string,
  completed: boolean
): Promise<Todos | undefined> {
  return db('todo')
    .where({ id })
    .update(task, completed)
    .returning(['id', 'task', 'completed'])
}

export async function deleteTodo(id: number): Promise<void> {
  await db('todo').where({ id }).delete()
}
