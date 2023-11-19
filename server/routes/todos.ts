import express from 'express'

import * as db from '../db/todos'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const todos = await db.getTodos()
    res.json(todos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    await db.addTodo({ ...req.body })
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    await db.updateTodo(id, req.body)
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).json({ error: 'woopsie server error' })
    }
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteTodo(id)
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).json({ error: 'woopsie server error' })
    }
  }
})

export default router
