import express from 'express'
import * as db from '../db/db.tsx'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const todo = await db.getAllTodo()
    res.json(todo)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get todo list')
  }
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    const taskId = await db.getTodoById(id)
    if (!taskId) {
      res.sendStatus(404)
      return
    }
    res.json(taskId)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get todo')
  }
})

router.post('/', async (req, res) => {
  const task = req.body
  if (!task) {
    res.status(400).send('Bad Request: task is required')
    return
  }

  try {
    const todo = await db.addTodo(task)
    res.status(200).json(todo)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not add todo')
  }
})

router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  const task = req.body
  if (!task) {
    res.status(400).send('Bad Request: task is required')
    return
  }

  try {
    await db.updateTodoTask(id, task)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not rename todo')
  }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    await db.deleteTodo(id)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not delete task')
  }
})

export default router
