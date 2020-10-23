const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const router = express.Router();

const { auth } = require('./routes');

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ url: process.env.DB_URL, ttl: 24 * 60 * 60 })
  })
);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

router.use('/auth', auth);

router.get('*', (req, res) => {
  res.status(404).send('Unknown Request');
});

module.exports = router;
