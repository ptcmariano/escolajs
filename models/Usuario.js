var sequelize = require('../config/sequelize').getSequelize(),
    Usuario = sequelize.model('Usuario');

exports.obterPorId = function(id) {
    return Usuario.findById(id);
};

exports.autenticar = function(nomeUsuario, senha) {
    return Usuario.findOne({where: {nomeUsuario: nomeUsuario, senha: senha}});
};

exports.novoUsuario = function(dados) {
    return Usuario.create(dados,
        {
            fields: ['nomeUsuario', 'senha']
        });
};