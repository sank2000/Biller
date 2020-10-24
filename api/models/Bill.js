const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const Bill = new Schema({
  customerId: {
    type: String,
    required: true
  },
  company: {
    type: Object,
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
  subTotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    required: true,
    default: false
  }
});

const bill = mongoose.model('bills', Bill);

module.exports = bill;
