var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Disciplina', {
        disciplina: {
            type: Sequelize.STRING(100),
            validate: {isAlpha: true},
            allowNull: false
        },
        sigla: {
            type: Sequelize.STRING(20),
            validate: {isAlpha: true},
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};