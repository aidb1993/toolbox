const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
const routes = require('./routes')
app.use('/files/data', routes)

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
