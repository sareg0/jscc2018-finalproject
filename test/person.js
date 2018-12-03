import test from 'ava'
// import request from 'supertest'
// import app from '../app'
const request = require('supertest')
const app = require('../app.js')
const PersonModel = require('../models/person')
const mongoose = require('mongoose')

test('create new person', async t => {
  const res = await request(app)
    .post('/person')
    .send({ name: 'Sammy Sammerson' })

  t.is(res.status, 200)
  t.is(res.body.name, 'Sammy Sammerson')
  const person = await PersonModel.findById(res.body._id)
  t.is(person.name, res.body.name)
})

test('update a person', async t => {
  const person = await PersonModel.create({ name: 'First McFirston' })

  const res = await request(app)
    .put(`/person/${person.id}`)
    .send({ name: 'Fancy McFirston' })

  console.log(res.body)
  t.is(res.status, 200)
  t.is(res.body.name, 'Fancy McFirston')
  const reloadedPerson = await PersonModel.findOne({ _id: person.id })
  t.is(reloadedPerson.name, res.body.name)
})

test.after.always('cleanup', t => {
  mongoose.connection.dropCollection('people')
});
