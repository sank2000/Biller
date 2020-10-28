const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Transaction = new Schema({
  billId: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const transaction = mongoose.model('transactions', Transaction);

module.exports = transaction;
