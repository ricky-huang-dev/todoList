import request from 'superagent'
import type { Todos } from '../models/Todos'

export async function getAllTodo(): Promise<Todos[]> {
  try {
    const response = await request.get('/api/v1/tasks')
    return response.body as Todos[]
  } catch (error) {
    // Handle error, for instance:
    console.error('Error fetching todos:', error)
    throw new Error('Failed to fetch todos')
  }
}

interface AddTodoParams {
  task: Todos['task']
}

export async function addTodo(task: AddTodoParams): Promise<void> {
  try {
    await request.post('/api/v1/tasks').send(task)
  } catch (error) {
    console.error('Error adding todo:', error)
    throw new Error('Failed to add todo')
  }
}

interface UpdateTodoParams {
  id: Todos['id']
  newTask: Todos['task']
}

export async function updateTodo({
  id,
  newTask,
}: UpdateTodoParams): Promise<void> {
  try {
    await request.patch(`/api/v1/tasks/${id}`).send({
      task: newTask,
    })
  } catch (error) {
    console.error('Error updating todo:', error)
    throw new Error('Failed to update todo')
  }
}

interface DeleteTodoParams {
  id: Todos['id']
}

export async function deleteTodo({ id }: DeleteTodoParams): Promise<void> {
  try {
    await request.delete(`/api/v1/tasks/${id}`)
  } catch (error) {
    console.error('Error deleting todo:', error)
    throw new Error('Failed to delete todo')
  }
}
