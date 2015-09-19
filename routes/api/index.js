var router = require('express').Router();

router.use('/usuarios', require('./usuariosRoute'));
router.use('/alunos', require('./alunosRoute'));
router.use('/professores', require('./professoresRoute'));
router.use('/turmas', require('./turmasRoute'));
router.use('/cursos', require('./cursosRoute'));
router.use('/areas', require('./areasRoute'));

router.use(require('../../components/apiErrorParser').sequelizeError);

module.exports = router;