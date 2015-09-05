/**
 * Created by edupsousa on 03/09/15.
 */
var Usuario = require('../../models/Usuario');

exports.novoUsuario = function(req, res, next) {
    return Usuario.novoUsuario(req.body)
        .then(function(usuario) {
            res.json(usuario);
        })
        .catch(next);
};

exports.exibirUsuario = function(req, res, next) {
    Usuario.obterPorId(req.params.id)
        .then(function(usuario) {
            res.json(usuario);
        })
        .catch(next);
};