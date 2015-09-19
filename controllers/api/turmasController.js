/**
 * Created by edupsousa on 03/09/15.
 */
var Turma = require('../../models/Turma');

exports.novaTurma = function(req, res, next) {
    return Turma.novaTurma(req.body)
        .then(function(turma) {
            res.json(turma);
        })
        .catch(next);
};

exports.exibirTurma = function(req, res) {
    res.json(req.turma);
};

exports.editarTurma = function(req, res, next) {
    Turma.salvarAlteracoes(req.turma, req.body)
        .then(function() {
            res.json(req.turma);
        })
        .catch(next);
};

exports.excluirTurma = function(req, res, next) {
    Turma.excluirTurma(req.turma)
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarTurmas = function(req, res, next) {
    Turma.listarTurmas()
        .then(function(turma) {
            res.json(turma);
        })
        .catch(next);
};

exports.obterTurmaMiddleware = function(req, res, next, id) {
    Turma.obterPorId(id)
        .then(function(turma) {
            if (turma === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.turma = turma;
                next();
            }
        })
        .catch(next);
};