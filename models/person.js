const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'a person must have a name'
  }
})
module.exports = mongoose.model('Person', PersonSchema);
