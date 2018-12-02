const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'a category must have a name'
  }
})

module.exports = mongoose.model('Category', CategorySchema);
