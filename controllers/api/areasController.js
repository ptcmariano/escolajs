var sequelize = require('../../config/sequelize').getSequelize(),
    Area = sequelize.model('Area');

exports.novaArea = function (req, res, next) {
    return Area.create(req.body, {
        fields: ['area']
    })
        .then(function (instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirArea = function (req, res) {
    res.json(req.instanciaArea);
};

exports.editarArea = function (req, res, next) {
    req.instanciaArea.updateAttributes(req.body, {
        fields: ['area']
    })
        .then(function () {
            res.json(req.instanciaArea);
        })
        .catch(next);
};

exports.excluirArea = function (req, res, next) {
    req.instanciaArea.destroy()
        .then(function () {
            res.json(true);
        })
        .catch(next);
};

exports.listarAreas = function (req, res, next) {
    Area.findAll()
        .then(function (instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterAreaMiddleware = function (req, res, next, id) {
    Area.findById(id)
        .then(function (instancia) {
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
