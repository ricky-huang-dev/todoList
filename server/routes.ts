import express from 'express'
import { addATask, getAllTasks, deleteTask, editTask } from './db/db'

const router = express.Router()

// bruno tested - all routes work
router.get('/', async (req, res) => {
  try {
    const getTasks = await getAllTasks()
    res.json(getTasks)
  } catch (error) {
    console.error(error)
  }
})

//
router.post('/', async (req, res) => {
  try {
    const { taskDetails, priority, completed } = req.body
    const newTask = {
      task_details: taskDetails,
      priority,
      completed,
    }
    await addATask(newTask)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { taskDetails, priority, completed } = req.body
    const updatedTask = {
      id,
      task_details: taskDetails,
      priority,
      completed,
    }
    await editTask(id, updatedTask)
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await deleteTask(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
  }
})

export default router
