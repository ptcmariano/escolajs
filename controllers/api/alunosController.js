var Aluno = require('../../models/Aluno');
var ControladorRest = new require('../../components/ControladorRest'),
    controller = new ControladorRest(Aluno);

exports.novoAluno = controller.novaInstancia.bind(controller);
exports.exibirAluno = controller.exibirInstancia.bind(controller);
exports.editarAluno = controller.editarInstancia.bind(controller);
exports.excluirAluno = controller.excluirInstancia.bind(controller);
exports.listarAlunos = controller.listarInstancias.bind(controller);
exports.obterAlunoMiddleware = controller.carregarInstanciaPorId.bind(controller);
