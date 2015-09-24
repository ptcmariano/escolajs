var Disciplina = require('../../models/Disciplina');
var ControladorRest = require('../../components/ControladorRest'),
    controller = new ControladorRest(Disciplina);

exports.novaDisciplina = controller.novaInstancia.bind(controller);
exports.exibirDisciplina = controller.exibirInstancia.bind(controller);
exports.editarDisciplina = controller.editarInstancia.bind(controller);
exports.excluirDisciplina = controller.excluirInstancia.bind(controller);
exports.listarDisciplinas = controller.listarInstancias.bind(controller);
exports.obterDisciplinaMiddleware = controller.carregarInstanciaPorId.bind(controller);
