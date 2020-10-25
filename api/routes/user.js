const express = require('express');
const router = express.Router();

const { getUser } = require('../controllers/userController');
const { isAuth } = require('../middlewares')

router.get('/',isAuth,getUser);


module.exports = router;