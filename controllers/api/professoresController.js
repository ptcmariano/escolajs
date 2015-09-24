var Professor = require('../../models/Professor');
var ControladorRest = require('../../components/ControladorRest'),
    controller = new ControladorRest(Professor);

exports.novoProfessor = controller.novaInstancia.bind(controller);
exports.exibirProfessor = controller.exibirInstancia.bind(controller);
exports.editarProfessor = controller.editarInstancia.bind(controller);
exports.excluirProfessor = controller.excluirInstancia.bind(controller);
exports.listarProfessores = controller.listarInstancias.bind(controller);
exports.obterProfessorMiddleware = controller.carregarInstanciaPorId.bind(controller);
