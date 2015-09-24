var Area = require('../../models/Area');
var ControladorRest = require('../../components/ControladorRest'),
    controller = new ControladorRest(Area);

exports.novaArea = controller.novaInstancia.bind(controller);
exports.exibirArea = controller.exibirInstancia.bind(controller);
exports.editarArea = controller.editarInstancia.bind(controller);
exports.excluirArea = controller.excluirInstancia.bind(controller);
exports.listarAreas = controller.listarInstancias.bind(controller);
exports.obterAreaMiddleware = controller.carregarInstanciaPorId.bind(controller);
