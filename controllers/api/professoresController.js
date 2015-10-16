var Professor = require('../../models/Professor');

exports.novoProfessor = function(req, res, next) {
    return Professor.novaInstancia(req.body)
        .then(function(instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirProfessor = function(req, res) {
    res.json(req.instanciaProfessor);
};

exports.editarProfessor = function(req, res, next) {
    req.instanciaProfessor.salvarAlteracoes(req.body)
        .then(function() {
            res.json(req.instanciaProfessor);
        })
        .catch(next);
};

exports.excluirProfessor = function(req, res, next) {
    req.instanciaProfessor.excluirInstancia()
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarProfessores = function(req, res, next) {
    Professor.listarInstancias()
        .then(function(instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterProfessorMiddleware = function(req, res, next, id) {
    Professor.obterPorId(id)
        .then(function(instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaProfessor = instancia;
                next();
            }
        })
        .catch(next);
};
