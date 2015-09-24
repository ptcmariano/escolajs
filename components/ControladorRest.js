module.exports = (function() {
    var Modelo;

    function Controlador(_Modelo) {
        Modelo = _Modelo;
    }

    Controlador.prototype.novaInstancia = function(req, res, next) {
        return Modelo.novaInstancia(req.body)
            .then(function(instancia) {
                res.json(instancia);
            })
            .catch(next);
    };

    Controlador.prototype.exibirInstancia = function(req, res) {
        res.json(req.instanciaModelo);
    };

    Controlador.prototype.editarInstancia = function(req, res, next) {
        req.instanciaModelo.salvarAlteracoes(req.body)
            .then(function() {
                res.json(req.instanciaModelo);
            })
            .catch(next);
    };

    Controlador.prototype.excluirInstancia = function(req, res, next) {
        req.instanciaModelo.excluirInstancia()
            .then(function() {
                res.json(true);
            })
            .catch(next);
    };

    Controlador.prototype.listarInstancias = function(req, res, next) {
        Modelo.listarInstancias()
            .then(function(instancias) {
                res.json(instancias);
            })
            .catch(next);
    };

    Controlador.prototype.carregarInstanciaPorId = function(req, res, next, id) {
        Modelo.obterPorId(id)
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

    return Controlador;
})();