const CategoryModel = require('../models/category')

async function add(category) {
  return CategoryModel.create(category)
}

async function update(id, name) {
  return CategoryModel.findByIdAndUpdate(id, { name: name }, (err) => {
    // if (err) { console.log('there was an error updating the category') }
  })
}

//only ever soft delete a category

module.exports = {
  add,
  update
}
