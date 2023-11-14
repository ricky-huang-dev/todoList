import express from 'express'
import { getTasks } from '../controllers/tasksController'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await getTasks()
    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
