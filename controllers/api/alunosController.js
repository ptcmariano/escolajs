/**
 * Created by edupsousa on 03/09/15.
 */
var Aluno = require('../../models/Aluno');
var RestController = require('../../components/ControladorRest');
var controller = new RestController(Aluno);

exports.novoAluno = controller.novaInstancia;
exports.exibirAluno = controller.exibirInstancia;
exports.editarAluno = controller.editarInstancia;
exports.excluirAluno = controller.excluirInstancia;
exports.listarAlunos = controller.listarInstancias;
exports.obterAlunoMiddleware = controller.carregarInstanciaPorId;