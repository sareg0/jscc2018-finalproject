const express = require('express')
const bodyParser = require('body-parser')

const PersonService = require('./services/person-service')
const TransactionService = require('./services/transaction-service')
const CategoryService = require('./services/category-service')

require('./mongo-connection')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.render('index')
})

//PERSON ENDPOINTS
app.post('/person', async (req, res) => {
  const person = await PersonService.add(req.body)
  res.send(person)
})

//better error handling/auth needed
app.put('/person/:id', async (req, res) => {
  try {
    const person = await PersonService.update(req.params.id, req.body)
    console.log('person was updated')
    res.send(person)
  } catch (err) {
    res.status(404)
    res.send({message: 'not found'})
  }
})

//TRANSACTION ENDPOINTS
app.post('/transaction', async (req, res) => {
  const transaction = await TransactionService.add(req.body)
  res.send(transaction)
})
// axios.post('/transaction', { amount: 5, category: "5c0409baf24537b6e4fb9fe0", date: Date.now(), owner: "5c03f70290a6edae96a00efc" })

//need to secure the following endpoint
app.put('/transaction/:id', async (req, res) => {
  try {
    const transaction = await TransactionService.update(req.params.id, req.body)
    res.send(transaction)
  } catch (err) {
    res.send(err.message)
  }
})

//need to secure the following endpoint
app.delete('/transaction/:id', async (req, res) => {
  try {
    await TransactionService.findRecordAndDelete(req.params.id)
    console.log('transaction was deleted')
  } catch (err) {
    console.log('')
    res.send(err.message)
  }
})

//CATEGORY ENDPOINTS
app.post('/category', async (req, res) => {
  try {
    const category = await CategoryService.add(req.body)
    res.send(category)
  } catch (err) {
    res.status(422)
    res.send(err.message)
  }
})

app.put('/category/:id', async (req, res) => {
  try {
    const category = await CategoryService.update(req.params.id, req.body.name)
    res.send(category)
  } catch (err) {
    res.status(422)
    res.send(err.message)
  }
})

//delete a category
//figure out how to delete a category without removing it from previous transaction records
//proper error logging

module.exports = app
