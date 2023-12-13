import server from './server.ts'
import express from 'express'
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('API server listening on port', PORT)
})

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static('../assets'))
  server.get('*', (req, res) => {
    res.sendFile('../index.html')
  })
}
