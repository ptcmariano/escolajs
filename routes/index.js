var express = require('express');
var router = express.Router();

router.use('/', require('./indexRoute'));
router.use('/users', require('./usersRoute'));

module.exports = router;
