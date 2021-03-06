const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const router = express.Router();

const { auth, user, bill, payment } = require('./routes');
const { isAuth } = require('./middlewares');

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
router.use('/user', user);
router.use('/bill', bill);
router.use('/payment', payment);

router.get("/config/paypal",isAuth, (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

router.get('*', (req, res) => {
  res.status(404).send('Unknown Request');
});

module.exports = router;
