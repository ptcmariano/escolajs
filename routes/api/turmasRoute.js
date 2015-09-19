/**
 * Created by edupsousa on 04/09/15.
 */
var router = require('express').Router();
var turmasCtrl = require('../../controllers/api/turmasController');

router.route('/')
    .get(turmasCtrl.listarTurmas)
    .post(turmasCtrl.novaTurma);

router.param('idTurma', turmasCtrl.obterTurmaMiddleware);

router.route('/:idTurma')
    .get(turmasCtrl.exibirTurma)
    .put(turmasCtrl.editarTurma)
    .delete(turmasCtrl.excluirTurma);

module.exports = router;