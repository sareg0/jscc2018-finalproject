const TransactionModel = require('../models/transaction')

async function add(transaction) {
  return TransactionModel.create(transaction)
}

async function update(transactionId, transaction) {
  console.log(transaction)
  // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  return TransactionModel.findByIdAndUpdate(transactionId, transaction, (err) => {
    if (err) { console.log('there was an error updating the transaction') }
  })
}

async function findRecordAndDelete(transactionId) {
  console.log(transactionId)
  // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
  return TransactionModel.findByIdAndDelete(transactionId, (err) => {
    if (err) { console.log('there was an error deleting the transaction') }
  })
}

module.exports = {
  add,
  update,
  findRecordAndDelete
}
