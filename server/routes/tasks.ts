import express from 'express'

import * as db from '../db/db'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await db.getTasks()
    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'woopsie server error' })
  }
})

export default router
