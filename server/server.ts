import express from 'express'
import { join } from 'node:path'
import * as Path from 'node:path'
import * as URL from 'node:url'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.static(join(__dirname, 'public')))
server.use(express.json())

import todosRoutes from './routes/todos.ts'

server.use('/api/v1/todos', todosRoutes)
server.use('/api/*', (req, res) => {
  res.sendStatus(404)
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
