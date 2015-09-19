
var Curso = require('../../models/Curso');

exports.novoCurso = function(req, res, next) {
    return Curso.novoCurso(req.body)
        .then(function(curso) {
            res.json(curso);
        })
        .catch(next);
};

exports.exibirCurso = function(req, res) {
    res.json(req.curso);
};

exports.editarCurso = function(req, res, next) {
    Curso.salvarAlteracoes(req.curso, req.body)
        .then(function() {
            res.json(req.curso);
        })
        .catch(next);
};

exports.excluirCurso = function(req, res, next) {
    Curso.excluirCurso(req.curso)
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarCursos = function(req, res, next) {
    Curso.listarCursos()
        .then(function(cursos) {
            res.json(cursos);
        })
        .catch(next);
};

exports.obterCursoMiddleware = function(req, res, next, id) {
    Curso.obterPorId(id)
        .then(function(curso) {
            if (curso === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.curso = curso;
                next();
            }
        })
        .catch(next);
};