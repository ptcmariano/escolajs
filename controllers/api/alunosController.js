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

exports.exibirAluno = function(req, res, next) {
    Aluno.obterPorId(req.params.id)
        .then(function(aluno) {
            res.json(aluno);
        })
        .catch(next);
};

exports.editarAluno = function(req, res, next) {
    Aluno.obterPorId(req.params.id)
        .then(function(aluno) {
            return Aluno.salvarAlteracoes(aluno, req.body)
                .then(function() {
                    res.json(aluno);
                });
        })
        .catch(next);
};

exports.excluirAluno = function(req, res, next) {
    Aluno.obterPorId(req.params.id)
        .then(function(aluno) {
            return Aluno.excluirAluno(aluno)
                .then(function() {
                    res.json(true);
                });
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
