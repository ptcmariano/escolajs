var router = require('express').Router();

router.use('/usuarios', require('./usuariosRoute'));
router.use('/alunos', require('./alunosRoute'));

module.exports = router;