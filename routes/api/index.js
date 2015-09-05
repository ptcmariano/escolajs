var router = require('express').Router();

router.use('/usuarios', require('./usuariosRoute'));

module.exports = router;