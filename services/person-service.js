const PersonModel = require('../models/person')

async function add(person) {
  return PersonModel.create(person)
}

async function update(person) {
  console.log(person)
  return PersonModel.findOne({ id: person.id }, (err, doc) => {
    if (err) {
      console.log('there was an error updating the Person')
    }
    doc.name = person.name
    doc.save()
  })
}

//only ever soft delete a person

module.exports = {
  add,
  update
}
