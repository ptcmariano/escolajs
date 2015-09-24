var Turma = require('../../models/Turma');
var ControladorRest = require('../../components/ControladorRest'),
    controller = new ControladorRest(Turma);

exports.novaTurma = controller.novaInstancia.bind(controller);
exports.exibirTurma = controller.exibirInstancia.bind(controller);
exports.editarTurma = controller.editarInstancia.bind(controller);
exports.excluirTurma = controller.excluirInstancia.bind(controller);
exports.listarTurmas = controller.listarInstancias.bind(controller);
exports.obterTurmaMiddleware = controller.carregarInstanciaPorId.bind(controller);
