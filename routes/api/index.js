var router = require('express').Router();

router.use('/usuarios', require('./usuariosRoute'));
router.use('/alunos', require('./alunosRoute'));
router.use(require('../../controllers/api/errorController').sequelizeError);

module.exports = router;