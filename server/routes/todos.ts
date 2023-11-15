import express from 'express'
import { addTask, deleteTask, listTasks, updateTask } from '../db/db'

const router = express.Router()

router.get('/', async (req, res) => {
  const list = await listTasks()

  res.json(list)
})

router.post('/', async (req, res) => {
  const newData = req.body

  try {
    await addTask(newData)
    res.sendStatus(201)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).json({ error: 'woopsie server error' })
    }
  }
})

router.patch('/:id', async (req, res) => {
  const id = +req.params.id
  const data = req.body

  try {
    await updateTask(id, data)
    res.send(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).json({ error: 'woopsie server error' })
    }
  }
})

router.delete('/:id', async (req, res) => {
  const id = +req.params.id

  try {
    await deleteTask(id)
    res.send(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).json({ error: 'woopsie server error' })
    }
  }
})

export default router
