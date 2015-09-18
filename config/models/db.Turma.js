var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Turma', {
        sigla: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        ano: {
            type: Sequelize.STRING(4),
            allowNull: false
        },
        semestre: {
            type: Sequelize.STRING(1),
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};