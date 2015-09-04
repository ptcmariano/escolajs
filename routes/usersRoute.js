var router = require('express').Router();
var userCtrl = require('../controllers/usersController');

router.get('/', userCtrl.renderIndex);

module.exports = router;
