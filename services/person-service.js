const PersonModel = require('../models/person')

async function add(person) {
  return PersonModel.create(person)
}

async function update(personId, person) {
  console.log("person:", personId, person)
  return PersonModel.findOneAndUpdate({ _id: personId }, person, (err) => {
    if (err) {
      console.log('there was an error updating the Person')
    }
  })
}

//only ever soft delete a person

module.exports = {
  add,
  update
}
