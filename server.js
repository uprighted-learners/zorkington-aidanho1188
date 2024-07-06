const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 5500

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
