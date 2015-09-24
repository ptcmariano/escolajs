var Curso = require('../../models/Curso');
var ControladorRest = require('../../components/ControladorRest'),
    controller = new ControladorRest(Curso);

exports.novoCurso = controller.novaInstancia.bind(controller);
exports.exibirCurso = controller.exibirInstancia.bind(controller);
exports.editarCurso = controller.editarInstancia.bind(controller);
exports.excluirCurso = controller.excluirInstancia.bind(controller);
exports.listarCursos = controller.listarInstancias.bind(controller);
exports.obterCursoMiddleware = controller.carregarInstanciaPorId.bind(controller);
