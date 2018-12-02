const express = require('express')
const bodyParser = require('body-parser')

const PersonService = require('./services/person-service')

require('./mongo-connection')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.render('index')
})

//PERSON ENDPOINTS
//create a person
app.post('/person', async (req, res) => {
  const person = await PersonService.add(req.body)
  res.send(person)
})

//edit a person
app.put('/person/:id', async (req, res) => {
  await PersonService.update(req.body)
  console.log('person was updated')
})

//TRANSACTION ENDPOINTS
//create a transaction
//required amount, date and category

//edit a transaction
//edit amount, date and category

//delete a transaction


//CATEGORY ENDPOINTS
//create a category
//required amount, date and category

//edit a category
//edit name

//delete a category
//if you delete a category it will not be deleted from previous transaction records
// will have to create a new model every time


module.exports = app
