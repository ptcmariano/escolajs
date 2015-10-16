var Area = require('../../models/Area');

exports.novaArea = function(req, res, next) {
    return Area.novaInstancia(req.body)
        .then(function(instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirArea = function(req, res) {
    res.json(req.instanciaArea);
};

exports.editarArea = function(req, res, next) {
    req.instanciaArea.salvarAlteracoes(req.body)
        .then(function() {
            res.json(req.instanciaArea);
        })
        .catch(next);
};

exports.excluirArea = function(req, res, next) {
    req.instanciaArea.excluirInstancia()
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarAreas = function(req, res, next) {
    Area.listarInstancias()
        .then(function(instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterAreaMiddleware = function(req, res, next, id) {
    Area.obterPorId(id)
        .then(function(instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaArea = instancia;
                next();
            }
        })
        .catch(next);
};
