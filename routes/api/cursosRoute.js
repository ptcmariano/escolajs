
var router = require('express').Router();
var cursosCtrl = require('../../controllers/api/cursosController');

router.route('/')
    .get(cursosCtrl.listarCursos)
    .post(cursosCtrl.novoCurso);

router.param('idCurso', cursosCtrl.obterCursoMiddleware);

router.route('/:idCurso')
    .get(cursosCtrl.exibirCurso)
    .put(cursosCtrl.editarCurso)
    .delete(cursosCtrl.excluirCurso);

module.exports = router;