const axios = require('axios')
const csv = require('csvtojson')

const url = 'https://echo-serv.tbxnet.com/v1/secret'
const bearerToken = 'Bearer aSuperSecretKey'

const getFileData = async (filename) => {
  try {
    const response = await axios.get(`${url}/file/${filename}`, {
      headers: {
        Authorization: bearerToken
      }
    })
    return {
      filename,
      data: response.data
    }
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

const formatFileData = async ({ data, filename }) => {
  const parsedCSV = await csv().fromString(data)
  const lines = []
  parsedCSV.forEach((line) => {
    if ((line.text && line.text !== '') && (line.number && line.number !== '') && (line.hex && line.hex !== '')) {
      lines.push({
        text: line.text,
        number: parseFloat(line.number),
        hex: line.hex
      })
    }
  })
  return {
    file: filename,
    lines
  }
}

const getFiles = async () => {
  const fileList = await listFiles()

  const promises = []
  fileList.data.forEach((file) => {
    promises.push(getFilesByFileName(file))
  })
  const res = await Promise.all(promises)

  const data = []

  res.map((file) => {
    if (file.status === 200) {
      data.push(file.data[0])
    }
  })

  return {
    data,
    status: 200
  }
}

const listFiles = async () => {
  try {
    const fileList = await axios.get(`${url}/files`, {
      headers: {
        Authorization: bearerToken
      }
    })
    const regex = /^test(\d+)\.csv$/

    const sortedFiles = fileList.data.files.sort((a, b) => {
      const numA = parseInt(a.match(regex)[1])
      const numB = parseInt(b.match(regex)[1])
      return numA - numB
    })

    return { data: sortedFiles, status: 200 }
  } catch (error) {
    const { message, status } = error.response.data
    return { data: message, status }
  }
}

const getFilesByFileName = async (fileName) => {
  try {
    const fileData = await getFileData(fileName)
    const formattedFileData = await formatFileData(fileData)
    const data = []
    data.push(formattedFileData)
    if (formattedFileData.lines.length === 0) {
      return { status: 404, data: 'File is empty' }
    }
    return {
      data,
      status: 200
    }
  } catch (error) {
    return { status: error.response.data.status, data: error.response.data.message }
  }
}

module.exports = {
  getFiles,
  listFiles,
  getFilesByFileName
}
