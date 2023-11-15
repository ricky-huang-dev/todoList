import db from './connection'
import { NewTodo, Todo } from '../../models/Todo'

export async function getAllTodos(): Promise<Todo[]> {
  return db('todos').select(
    'todo_id as todoId',
    'task',
    'priority',
    'completed'
  )
}

export async function addTodos(newTodo: NewTodo): Promise<NewTodo | undefined> {
  return db('todos').insert(newTodo)
}

export async function updateTodos(
  id: Todo['todoId'],
  task: Todo['task'],
  priority: Todo['priority'],
  completed: Todo['completed']
): Promise<Todo> {
  return db('todos')
    .where('todo_id', id)
    .update({ task, priority, completed })
    .returning(['todo_id as todoId', 'task', 'priority', 'completed'])
}

export async function deleteTodo(id: Todo['todoId']) {
  return db('todos').where('todo_id', id).del()
}
