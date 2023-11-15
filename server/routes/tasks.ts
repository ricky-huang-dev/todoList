import express from 'express'
import { deleteTask, addTask } from '../db/db'
import * as db from '../db/db'

const router = express.Router()

// router to display the homePage//

router.get('/', async (req, res) => {
  try {
    const tasks = await db.getTasks()
    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'woopsie server error' })
  }
})

//router for deleting task//

router.delete('/:id', async (req, res) => {
  try {
    const dataId = Number(req.params.id)
    await deleteTask(dataId)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'something wrong' })
  }
})

// router for editing the task //
router.patch('/:id', async (req, res) => {
  try {
    const taskId = Number(req.params.id)
    const task = String(req.body.task)

    await db.updateTask(taskId, task)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

// router for adding the task //
router.post('/', async (req, res) => {
  try {
    const newPost = req.body
    await addTask(newPost)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

export default router
