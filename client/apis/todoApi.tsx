import request from 'superagent'
import type { Todos } from '../models/Todos'

export async function getAllTodo() {
  const response = await request.get('/api/v1/tasks')
  return response.body as Todos[]
}

interface AddTodo {
  task: Todos['task']
  status: Todos['status']
  deadline: Todos['deadline']
  description: Todos['descripion']
}
export async function addTodo({
  task,
  status,
  deadline,
  description,
}: AddTodo): Promise<void> {
  await request
    .post('/api/v1/tasks')
    .send({ task, status, deadline, description })
}

interface updateTodoTask {
  id: Todos['id']
  newTask: Todos['task']
  newStatus: Todos['status']
  newDeadline: Todos['deadline']
  newDescription: Todos['descripion']
}
export async function updateTodoTask({
  id,
  newTask,
  newStatus,
  newDeadline,
  newDescription,
}: updateTodoTask): Promise<void> {
  await request.patch(`/api/v1/pokemon/${id}`).send({
    task: newTask,
    status: newStatus,
    deadline: newDeadline,
    description: newDescription,
  })
}

interface deleteTodo {
  id: Todos['id']
}
export async function deleteTodo({ id }: deleteTodo): Promise<void> {
  await request.delete(`/api/v1/tasks/${id}`)
}
