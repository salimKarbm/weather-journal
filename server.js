const express = require('express')

//initialising express
const app = express()

//middleware for accepting form data
app.use(express.urlencoded({ extended: false }))

//middleware for acceptingm json data
app.use(express.json())

//serving static files middleware
app.use(express.static('website'))

//create an object
const projectData = {}

//GET route
app.get('/getData', (req, res) => {
  res.send(projectData)
})

//POST route
app.post('/postData', (req, res) => {
  projectData.temperature = req.body.data.temperature
  projectData.userResponse = req.body.data.userResponse
  projectData.date = req.body.data.date
  res.send({ status: 'data added successfully', data: projectData })
})

//create port
const PORT = 3000

//listen to server
app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})
