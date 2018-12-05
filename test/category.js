import test from 'ava'
import request from 'supertest'
import app from '../app'

const CategoryModel = require('../models/category')
const mongoose = require('mongoose')

test('create a new category', async t => {
  const res = await request(app)
    .post('/category')
    .send({ name: 'Shopping'})

  t.is(res.body.name, 'Shopping')
  t.is(res.status, 200)
  const category = await CategoryModel.findById(res.body._id)
  t.is(category.name, res.body.name)
})

test('create a new category without required fields', async t => {
  const res = await request(app)
    .post('/category')
    .send({})

  //not really good enough
  t.is(res.status, 422)
})

test('update a category', async t => {
  const category = await CategoryModel.create({ name: 'Savings' })

  const res = await request(app)
    .put(`/category/${category.id}`)
    .send({ name: 'Moar Savings' })

  t.is(res.status, 200)
  t.is(res.body.name, 'Moar Savings')
  const reloadedcategory = await CategoryModel.findOne({ _id: category.id })
  t.is(reloadedcategory.name, res.body.name)
})

test('try update a category that doesn\'t exist', async t => {
  const res = await request(app)
    .put(`/category/not-right`)
    .send({ name: 'Treat yourself' })

  t.is(res.status, 422)
})

test.after.always('cleanup', t => {
  mongoose.connection.dropCollection('categories')
})
