var express = require('express');
var router = express.Router();

var userController = require('../config/Controller/userController');

router.use('/exercicio1', require('./exercicio1'));
router.use('/exercicio3', require('./exercicio3'));
router.use('/exerciciox', require('./exerciciox'));
router.use('/auth', require('./auth'));

module.exports = router;