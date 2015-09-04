var sequelize = require('../config/sequelize').getSequelize(),
    Usuario = sequelize.model('Usuario');

exports.obterPorId = function(id, cb) {
    return Usuario.findById(id)
        .then(function(usuario) {
            cb(null, usuario);
        });
};

exports.autenticar = function(nomeUsuario, senha, cb) {
    return Usuario.findOne({nomeUsuario: nomeUsuario, senha: senha})
        .then(function(usuario) {
            cb(null, usuario);
        });
};