var router = require('express').Router();

router.use('/usuarios', require('./usuariosRoute'));
router.use('/alunos', require('./alunosRoute'));
router.use('/professores', require('./professoresRoute'));
module.exports = router;