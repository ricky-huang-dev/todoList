import express from 'express'
import * as db from '../db/db.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    await db.getAllTasks().then((todos) => {
      res.json(todos)
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not add pokemon')
  }
})

export default router
