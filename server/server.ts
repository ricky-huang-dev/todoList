import express from 'express'
import * as Path from 'node:path'
import todo from './routes/todos'

const server = express()

server.use(express.json())
server.use('/api/v1/tasks', todo)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static('../assets'))
  server.get('*', (req, res) => {
    res.sendFile('../index.html')
  })
}

export default server
