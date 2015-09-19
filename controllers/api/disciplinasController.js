/**
 * Created by edupsousa on 03/09/15.
 */
var Disciplina = require('../../models/Disciplina');

exports.novaDisciplina = function(req, res, next) {
    return Disciplina.novaDisciplina(req.body)
        .then(function(disciplina) {
            res.json(disciplina);
        })
        .catch(next);
};

exports.exibirDisciplina = function(req, res) {
    res.json(req.disciplina);
};

exports.editarDisciplina = function(req, res, next) {
    Disciplina.salvarAlteracoes(req.disciplina, req.body)
        .then(function() {
            res.json(req.disciplina);
        })
        .catch(next);
};

exports.excluirDisciplina = function(req, res, next) {
    Disciplina.excluirDisciplina(req.disciplina)
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarDisciplinas = function(req, res, next) {
    Disciplina.listarDisciplinas()
        .then(function(disciplinas) {
            res.json(disciplinas);
        })
        .catch(next);
};

exports.obterDisciplinaMiddleware = function(req, res, next, id) {
    Disciplina.obterPorId(id)
        .then(function(disciplina) {
            if (disciplina === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.disciplina = disciplina;
                next();
            }
        })
        .catch(next);
};