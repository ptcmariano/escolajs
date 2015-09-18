/// </// <reference path="../../typings/tsd.d.ts" />
var Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('Usuario', {
        nomeUsuario: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
        },
        senha: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    }, {
        freezeTableName: true
    });
};