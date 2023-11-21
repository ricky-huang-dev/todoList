import request from 'superagent'
import * as model from '../../models/Todo.ts'

const todoURL = '/api/v1/todos'

export async function getTodoList(): Promise<model.Todo[]> {
  return request.get(todoURL).then((res) => res.body)
}

export async function deleteTodo(todoId: model.Todo['todoId']): Promise<void> {
  await request.delete(`${todoURL}/${todoId}`)
}

export async function addTodo(
  todoText: model.NewTodo['task']
): Promise<model.NewTodo> {
  const res = await request
    .post(`${todoURL}`)
    .send({ task: todoText, priority: 'ASAP', completed: false })
  //alternatively, a new migration should be created to set defaults for priority and completed
  return res.body
}

export async function updateTodo(completedTodo: model.Todo) {
  try {
    const res = await request
      .patch(`${todoURL}/${completedTodo.todoId}`)
      .send(completedTodo)
    return res.body
  } catch (error) {
    console.error(error)
  }
}
