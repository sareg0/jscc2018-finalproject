import test from 'ava'
import request from 'supertest'
import app from '../app'

const TransactionModel = require('../models/transaction')
const PersonModel = require('../models/person')
const CategoryModel = require('../models/category')

//you could save your models and such outside of the tests for re-use
const mongoose = require('mongoose')

test('create a transaction', async t => {
  const person = await PersonModel.create({ name: 'First McFirston' })
  const category = await CategoryModel.create({ name: 'Stuffz' })
  const date = Date.now()

  const res = await request(app)
    .post('/transaction')
    .send({ amount: 5, category: category.id, date: date, owner: person.id })

  t.is(res.status, 200)

  const transaction = await TransactionModel.findById(res.body._id)
  t.truthy(transaction)
  t.is(transaction.amount, res.body.amount)
})

test('update a transaction', async t => {
  const person = await PersonModel.create({ name: 'First McFirston' })
  const category = await CategoryModel.create({ name: 'Stuffz' })
  const date = Date.now()

  const transaction = await TransactionModel.create({ amount: 5, category: category.id, date: date, owner: person.id })

  const category2 = await CategoryModel.create({ name: 'Video Games' })

  const res = await request(app)
    .put(`/transaction/${transaction.id}`)
    .send({ amount: 18, category: category2.id, date: date, owner: person.id })

  const reloadedTransaction = await TransactionModel.findById(res.body._id)
  t.is(reloadedTransaction.amount, res.body.amount)
  t.is(res.status, 200)
})

// const fn = () => {
// 	throw new TypeError('🦄');
// }

// test.only('update a transaction that doesn\'t exist', async t => {
//   const res = await request(app)
//     .put(`/transaction/not-right`)
//     .send({ amount: 18 })

//   test('throws', t => {
//     const error = t.throws(() => {
//       fn();
//     }, TypeError)

//     t.is(error.message, '🦄');
//   })

// })

// test('delete a transaction', async t => {
//   const res = await request(app)
//     .delete(`/transaction/${transaction.id}`)
//     .send()
// })

test.todo('list transactions? Endpoint doesn\'t exist yet')
