import express from 'express'
import { addTask, deleteTask, getTasks, updateTask } from '../controllers/tasks'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    console.log('server routes tasks get /')
    const tasks = await getTasks()
    console.log('server:tasks', tasks)
    res.status(200).json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Add a new task
router.post('/', async (req, res) => {
  console.log('server post task')
  const newTask = req.body
  try {
    const addedTask = await addTask(newTask)
    console.log(addedTask)
    res.status(201).json(addedTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Edit a task
router.patch('/:taskId', async (req, res) => {
  const taskId = Number(req.params.taskId)
  try {
    const updatedTask = await updateTask(taskId, req.body)
    res.status(200).json(updatedTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Delete a task
router.delete('/:taskId', async (req, res) => {
  const taskId = Number(req.params.taskId)
  try {
    await deleteTask(taskId)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
