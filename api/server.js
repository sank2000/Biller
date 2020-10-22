const express = require('express');
const session = require('express-session');

const router = express.Router();

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

router.get('*', (req, res) => {
  res.status(404).send('Unknown Request');
});

module.exports = router;