import request from 'superagent'
import * as model from '../../models/Todo.ts'

const todoURL = '/api/v1/todos'

export async function getTodoList(): Promise<model.Todo[]> {
  return request.get(todoURL).then((res) => res.body)
}

export async function deleteTodo(taskId: model.Todo['todoId']): Promise<void> {
  await request.delete(`${todoURL}/${taskId}`)
}
