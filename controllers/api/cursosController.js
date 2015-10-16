var Curso = require('../../models/Curso');

exports.novoCurso = function(req, res, next) {
    return Curso.novaInstancia(req.body)
        .then(function(instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirCurso = function(req, res) {
    res.json(req.instanciaCurso);
};

exports.editarCurso = function(req, res, next) {
    req.instanciaCurso.salvarAlteracoes(req.body)
        .then(function() {
            res.json(req.instanciaCurso);
        })
        .catch(next);
};

exports.excluirCurso = function(req, res, next) {
    req.instanciaCurso.excluirInstancia()
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarCursos = function(req, res, next) {
    Curso.listarInstancias()
        .then(function(instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterCursoMiddleware = function(req, res, next, id) {
    Curso.obterPorId(id)
        .then(function(instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaCurso = instancia;
                next();
            }
        })
        .catch(next);
};
