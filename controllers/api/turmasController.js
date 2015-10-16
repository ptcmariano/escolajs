var Turma = require('../../models/Turma');

exports.novaTurma = function(req, res, next) {
    return Turma.novaInstancia(req.body)
        .then(function(instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirTurma = function(req, res) {
    res.json(req.instanciaTurma);
};

exports.editarTurma = function(req, res, next) {
    req.instanciaTurma.salvarAlteracoes(req.body)
        .then(function() {
            res.json(req.instanciaTurma);
        })
        .catch(next);
};

exports.excluirTurma = function(req, res, next) {
    req.instanciaTurma.excluirInstancia()
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarTurmas = function(req, res, next) {
    Turma.listarInstancias()
        .then(function(instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterTurmaMiddleware = function(req, res, next, id) {
    Turma.obterPorId(id)
        .then(function(instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaTurma = instancia;
                next();
            }
        })
        .catch(next);
};
