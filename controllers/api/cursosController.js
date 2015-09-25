var Curso = require('../../models/Curso');
var ControladorRest = require('../../components/ControladorRest'),
    controller = new ControladorRest(Curso);

exports.exibirCurso = controller.exibirInstancia.bind(controller);
exports.editarCurso = controller.editarInstancia.bind(controller);
exports.excluirCurso = controller.excluirInstancia.bind(controller);
exports.listarCursos = controller.listarInstancias.bind(controller);
exports.obterCursoMiddleware = controller.carregarInstanciaPorId.bind(controller);

exports.novoCurso = function(req, res, next) {
    return Curso.novaInstancia(req.body)
        .then(function(curso) {
            return curso.setArea(req.body.area);
        })
        .then(function(curso) {
            res.json(curso);
        })
        .catch(next);
};