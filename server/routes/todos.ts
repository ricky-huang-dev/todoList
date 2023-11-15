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

router.post('/', async (req, res) => {
  const newTodo = req.body
  console.log(newTodo)
  try {
    await db.addTodos(newTodo)
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).send('Hmm?? what are you adding')
  }
})

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }
  const { task, priority, completed } = req.body
  try {
    await db.updateTodos(id, task, priority, completed)
    res.status(200).send('Updated')
  } catch (error) {
    console.error(error)
    res.status(500).send('Something is wrong!!!')
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    await db.deleteTodo(id)
    res.status(200).send('Deleted')
  } catch (error) {
    console.error(error)
    res.status(500).send('WRONG!')
  }
})

export default router
