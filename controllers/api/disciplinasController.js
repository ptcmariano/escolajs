var Disciplina = require('../../models/Disciplina');

exports.novaDisciplina = function(req, res, next) {
    return Disciplina.novaInstancia(req.body)
        .then(function(instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirDisciplina = function(req, res) {
    res.json(req.instanciaDisciplina);
};

exports.editarDisciplina = function(req, res, next) {
    req.instanciaDisciplina.salvarAlteracoes(req.body)
        .then(function() {
            res.json(req.instanciaDisciplina);
        })
        .catch(next);
};

exports.excluirDisciplina = function(req, res, next) {
    req.instanciaDisciplina.excluirInstancia()
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarDisciplinas = function(req, res, next) {
    Disciplina.listarInstancias()
        .then(function(instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterDisciplinaMiddleware = function(req, res, next, id) {
    Disciplina.obterPorId(id)
        .then(function(instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaDisciplina = instancia;
                next();
            }
        })
        .catch(next);
};
