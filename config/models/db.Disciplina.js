var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Disciplina', {
        disciplina: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        sigla: {
            type: Sequelize.STRING(20),
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};