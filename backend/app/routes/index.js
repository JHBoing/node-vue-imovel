var express = require('express');
var router = express.Router();

router.use('/exercicio1', require('./exercicio1'));
router.use('/exercicio3', require('./exercicio3'));

module.exports = router;