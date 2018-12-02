const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: 'transactions must have a category'
  },
  date: Date,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: 'transactions must have an owner'
  }
})
module.exports = mongoose.model('Transaction', TransactionSchema);

//https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/

// axios.[method]('[ROUTE]', { amount: 5, category: [CATEGORY ID] , date: Date.now, owner: [PERSON ID] })

// TODO: CREATE SEED DATA
