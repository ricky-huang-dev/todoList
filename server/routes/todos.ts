import express from 'express'

import { getTodos, addTodo, deleteTodo, updateTodo } from '../db/db'

const router = express.Router()

router.get('/', async (req, res) => {
  const response = await getTodos()
  res.json(response)
})

router.post('/', async (req, res) => {
  const newTodo = req.body
  await addTodo(newTodo)
  res.sendStatus(201)
})

router.delete('/:id', async (req, res) => {
  const todoId = Number(req.params.id)
  await deleteTodo(todoId)
  res.sendStatus(200)
})

router.patch('/:id', async (req, res) => {
  const todoId = Number(req.params.id)
  const newTodo = req.body
  await updateTodo(todoId, newTodo)
  res.sendStatus(200)
})

export default router
