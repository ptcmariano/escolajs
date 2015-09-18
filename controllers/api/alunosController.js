/**
 * Created by edupsousa on 03/09/15.
 */
var Aluno = require('../../models/Aluno');

exports.novoAluno = function(req, res, next) {
    return Aluno.novoAluno(req.body)
        .then(function(aluno) {
            res.json(aluno);
        })
        .catch(next);
};

exports.exibirAluno = function(req, res) {
    res.json(req.aluno);
};

exports.editarAluno = function(req, res, next) {
    Aluno.salvarAlteracoes(req.aluno, req.body)
        .then(function() {
            res.json(req.aluno);
        })
        .catch(next);
};

exports.excluirAluno = function(req, res, next) {
    Aluno.excluirAluno(req.aluno)
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarAlunos = function(req, res, next) {
    Aluno.listarAlunos()
        .then(function(alunos) {
            res.json(alunos);
        })
        .catch(next);
};

exports.obterAlunoMiddleware = function(req, res, next, id) {
    Aluno.obterPorId(id)
        .then(function(aluno) {
            if (aluno === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.aluno = aluno;
                next();
            }
        })
        .catch(next);
};