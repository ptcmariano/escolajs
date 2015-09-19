/**
 * Created by edupsousa on 03/09/15.
 */
var Professor = require('../../models/Professor');

exports.novoProfessor = function(req, res, next) {
    return Professor.novoProfessor(req.body)
        .then(function(Professor) {
            res.json(Professor);
        })
        .catch(next);
};

exports.exibirProfessor = function(req, res) {
    res.json(req.professor);
};

exports.editarProfessor = function(req, res, next) {
    Professor.salvarAlteracoes(req.professor, req.body)
        .then(function() {
            res.json(req.professor);
        })
        .catch(next);
};

exports.excluirProfessor = function(req, res, next) {
    Professor.excluirProfessor(req.professor)
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarProfessores = function(req, res, next) {
    Professor.listarProfessores()
        .then(function(professores) {
            res.json(professores);
        })
        .catch(next);
};

exports.obterProfessorMiddleware = function(req, res, next, id) {
    Professor.obterPorId(id)
        .then(function(professor) {
            if (professor === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.professor = professor;
                next();
            }
        })
        .catch(next);
};