module.exports = (function() {
    var modelo;

    function Controller(_modelo) {
        modelo = _modelo;
    }

    Controller.prototype.novaInstancia = function(req, res, next) {
        return modelo.novaInstancia(req.body)
            .then(function(instancia) {
                res.json(instancia);
            })
            .catch(next);
    };

    Controller.prototype.exibirInstancia = function(req, res) {
        res.json(req.instanciaModelo);
    };

    Controller.prototype.editarInstancia = function(req, res, next) {
        modelo.salvarAlteracoes(req.instanciaModelo, req.body)
            .then(function() {
                res.json(req.instanciaModelo);
            })
            .catch(next);
    };

    Controller.prototype.excluirInstancia = function(req, res, next) {
        modelo.excluirInstancia(req.instanciaModelo)
            .then(function() {
                res.json(true);
            })
            .catch(next);
    };

    Controller.prototype.listarInstancias = function(req, res, next) {
        modelo.listarInstancias()
            .then(function(instancias) {
                res.json(instancias);
            })
            .catch(next);
    };

    Controller.prototype.carregarInstanciaPorId = function(req, res, next, id) {
        modelo.obterPorId(id)
            .then(function(instancia) {
                if (instancia === null) {
                    var err = new Error('Not Found');
                    err.status = 404;
                    next(err);
                } else {
                    req.instanciaModelo = instancia;
                    next();
                }
            })
            .catch(next);
    };

    return Controller;
})();