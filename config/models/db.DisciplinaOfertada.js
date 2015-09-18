var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('DisciplinaOfertada', {
        dataInicio: {
            type: Sequelize.DATE,
            allowNull: false
        },
        dataEncerramento: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};