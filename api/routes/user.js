const express = require('express');
const router = express.Router();

const { getUser } = require('../controllers/userController');
const { isAuth,isOwner } = require('../middlewares')

router.get('/customer', isAuth, isOwner, getUser);


module.exports = router;