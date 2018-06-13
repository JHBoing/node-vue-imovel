var express = require('express');
var router = express.Router();

var userController = require('../config/Controller/userController');

router.post('/register', userController.register);
router.get('/me', userController.me);

module.exports = router;