var Aluno = require('../../models/Aluno');

exports.novoAluno = function(req, res, next) {
    return Aluno.novaInstancia(req.body)
        .then(function(instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirAluno = function(req, res) {
    res.json(req.instanciaAluno);
};

exports.editarAluno = function(req, res, next) {
    req.instanciaAluno.salvarAlteracoes(req.body)
        .then(function() {
            res.json(req.instanciaAluno);
        })
        .catch(next);
};

exports.excluirAluno = function(req, res, next) {
    req.instanciaAluno.excluirInstancia()
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarAlunos = function(req, res, next) {
    Aluno.listarInstancias()
        .then(function(instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterAlunoMiddleware = function(req, res, next, id) {
    Aluno.obterPorId(id)
        .then(function(instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaAluno = instancia;
                next();
            }
        })
        .catch(next);
};
