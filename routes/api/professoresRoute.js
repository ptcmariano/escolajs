/**
 * Created by edupsousa on 04/09/15.
 */
var router = require('express').Router();
var professoresCtrl = require('../../controllers/api/professoresController');

router.route('/')
    .get(professoresCtrl.listarProfessores)
    .post(professoresCtrl.novoProfessor);

router.param('idProfessor', professoresCtrl.obterProfessorMiddleware);

router.route('/:idProfessor')
    .get(professoresCtrl.exibirProfessor)
    .put(professoresCtrl.editarProfessor)
    .delete(professoresCtrl.excluirProfessor);

module.exports = router;