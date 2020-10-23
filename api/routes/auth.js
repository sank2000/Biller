const express = require('express');
const router = express.Router();

const { CheckSession, signUp, signIn, signOut } = require('../controllers/authController');

router.get('/', CheckSession);

router.post('/signup', signUp);

router.post('/signin', signIn);

router.get('/signout', signOut);

module.exports = router;
