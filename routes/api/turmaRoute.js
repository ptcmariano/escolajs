/**
 * Created by edupsousa on 04/09/15.
 */
var router = require('express').Router();
var turmaCtrl = require('../../controllers/api/turmaController');

router.route('/')
    .get(turmaCtrl.listarTurma)
    .post(turmaCtrl.novoTurma);

router.param('idTurma', turmaCtrl.obterTurmaMiddleware);

router.route('/:idTurma')
    .get(turmaCtrl.exibirTurma)
    .put(turmaCtrl.editarTurma)
    .delete(turmaCtrl.excluirTurma);

module.exports = router;