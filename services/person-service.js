const PersonModel = require('../models/person')

async function add(person) {
  return PersonModel.create(person)
}

function update(personId, person) {
  return PersonModel.findOneAndUpdate({ _id: personId }, person, (err) => {
    // if (err) { return err.message }
  })
}

//only ever soft delete a person

module.exports = {
  add,
  update
}
