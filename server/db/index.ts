import knex from 'knex'
import knexfile from './knexfile'
import { AddTask, UpdateTask } from '../../Models/tasks'

const config = knexfile.development
const db = knex(config)

export function listTasks() {
  return db('tasks').select()
}

export function addTask(newTask: AddTask) {
  return db('tasks').insert(newTask)
}

export function updateTask(id: number, data: string) {
  return db('tasks').where('id', id).update(data)
}

export function deleteTask(id: number) {
  return db('tasks').where({ id }).del()
}
