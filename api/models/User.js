const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const User = new mongoose.Schema({
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
    required: true,
    index: { unique: true }
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    default: null
  },
  companyName: {
    type: String,
    default: null
  },
  bills: {
    type: Array,
    default: []
  }
});

const user = mongoose.model('users', User);

module.exports = user;
