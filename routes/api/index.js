var router = require('express').Router();

router.use('/usuarios', require('./usuariosRoute'));
router.use('/alunos', require('./alunosRoute'));
router.use('/areas', require('./areasRoute'));

module.exports = router;