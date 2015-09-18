var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Curso', {
        curso: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        sigla: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true
    });
};