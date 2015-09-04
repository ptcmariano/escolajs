var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Usuario', {
        nomeUsuario: Sequelize.TEXT,
        senha: Sequelize.TEXT
    });
};