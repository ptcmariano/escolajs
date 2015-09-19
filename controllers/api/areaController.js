/**
 * Created by renanluc on 18/09/15.
 */
var Area = require('../../models/Area');

exports.novaArea = function(req, res, next) {
    return Area.novaArea(req.body)
        .then(function(area) {
            res.json(area);
        })
        .catch(next);
};

exports.exibirArea = function(req, res) {
    res.json(req.area);
};

exports.editarArea = function(req, res, next) {
    Area.salvarAlteracoes(req.area, req.body)
        .then(function() {
            res.json(req.area);
        })
        .catch(next);
};

exports.excluirArea = function(req, res, next) {
    Area.excluirArea(req.area)
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarArea = function(req, res, next) {
    Area.listarArea()
        .then(function(area) {
            res.json(area);
        })
        .catch(next);
};

exports.obterAreaMiddleware = function(req, res, next, id) {
    Area.obterPorId(id)
        .then(function(area) {
            if (area === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.area = area;
                next();
            }
        })
        .catch(next);
};