const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const Bill = new Schema({
  CustomerId: {
    type: String,
    required: true
  },
  CompanyId: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true,
    default: []
  },
  tax: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true,
    default: 'Not paid'
  }
});

const user = mongoose.model('bills', Bill);

module.exports = user;
