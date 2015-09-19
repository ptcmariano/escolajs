var router = require('express').Router();

router.use('/usuarios', require('./usuariosRoute'));
router.use('/alunos', require('./alunosRoute'));
router.use('/disciplinas', require('./disciplinasRoute'));

module.exports = router;