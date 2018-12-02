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

app.put('/person/:id', async (req, res) => {
  await PersonService.update(req.body)
  console.log('person was updated')
})

//TRANSACTION ENDPOINTS
app.post('/transaction', async (req, res) => {
  const transaction = await TransactionService.add(req.body)
  res.send(transaction)
  console.log('transaction was created')
})
// axios.post('/transaction', { amount: 5, category: "5c0409baf24537b6e4fb9fe0", date: Date.now(), owner: "5c03f70290a6edae96a00efc" })

//need to secure the following endpoint
app.put('/transaction/:id', async (req, res) => {
  await TransactionService.update(req.params.id, req.body)
  console.log('transaction was updated')
})

//need to secure the following endpoint
app.delete('/transaction/:id', async (req, res) => {
  await TransactionService.findRecordAndDelete(req.params.id)
  console.log('transaction was deleted')
})

//CATEGORY ENDPOINTS
app.post('/category', async (req, res) => {
  const category = await CategoryService.add(req.body)
  res.send(category)
  console.log('category was created')
})

app.put('/category/:id', async (req, res) => {
  await CategoryService.update(req.params.id, req.body.name)
  console.log('category was updated')
})

//delete a category
//figure out how to delete a category without removing it from previous transaction records
//proper error logging

module.exports = app
