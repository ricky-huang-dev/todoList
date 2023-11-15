import express from 'express'
import * as db from '../db/db.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const todos = await db.getAllTodos()
    res.json(todos)
  } catch (error) {
    console.error(error)
    res.status(500).send('Whoops an error has occurred on our side')
  }
})

export default router
