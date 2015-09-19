/**
 * Created by edupsousa on 04/09/15.
 */
var router = require('express').Router();
var disciplinasCtrl = require('../../controllers/api/disciplinasController');

router.route('/')
    .get(disciplinasCtrl.listarDisciplinas)
    .post(disciplinasCtrl.novaDisciplina);

router.param('idDisciplina', disciplinasCtrl.obterDisciplinaMiddleware);

router.route('/:idDisciplina')
    .get(disciplinasCtrl.exibirDisciplina)
    .put(disciplinasCtrl.editarDisciplina)
    .delete(disciplinasCtrl.excluirDisciplina);

module.exports = router;