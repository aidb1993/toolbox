const express = require('express')
const router = express.Router()
const { getFiles, getFilesByFileName, listFiles } = require('../services/files.service')

router.get('/', async (req, res) => {
  const { filename } = req.query
  if (filename) {
    const { data, status } = await getFilesByFileName(filename)
    res.status(status).json(data)
  } else {
    const { data, status } = await getFiles()
    res.status(status).json(data)
  }
})

router.get('/list', async (req, res) => {
  const { data, status } = await listFiles()
  res.status(status).json(data)
})

module.exports = router
