import express from 'express'
import * as db from '../db/dbFunctions'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await db.showTasks()
    res.json(tasks)
  } catch (err) {
    console.log(err)
    res.status(500).send('Taks not found')
  }
})

router.patch('/', async (req, res) => {
  const form = req.body

  if (!form) {
    return res.status(400).json({ message: 'Please provide a form' })
  }

  const { done, task_id } = form
  try {
    await db.taskComplete(done, task_id)
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.status(500).send('server not found')
  }
})

router.delete('/', async (req, res) => {
  const deleteTask = req.body
  const { id } = deleteTask
  try {
    await db.deleteTask(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('server not found')
  }
})

router.post('/', async (req, res) => {
  const details = req.body
  const { taskDetails } = details

  try {
    await db.addTask(taskDetails)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    return res.status(500).send('server not found')
  }
})

export default router
