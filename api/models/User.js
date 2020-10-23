const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    default: 'default'
  },
  companyName: {
    type: String,
    default: 'default'
  },
  bills: {
    type: Array,
    default: []
  }
});

const user = mongoose.model('users', User);

module.exports = user;
