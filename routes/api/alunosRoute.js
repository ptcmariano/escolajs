/**
 * Created by edupsousa on 04/09/15.
 */
var router = require('express').Router();
var alunosCtrl = require('../../controllers/api/alunosController');

router.route('/')
    .get(alunosCtrl.listarAlunos)
    .post(alunosCtrl.novoAluno);

router.param('idAluno', alunosCtrl.obterAlunoMiddleware);

router.route('/:idAluno')
    .get(alunosCtrl.exibirAluno)
    .put(alunosCtrl.editarAluno)
    .delete(alunosCtrl.excluirAluno);

module.exports = router;