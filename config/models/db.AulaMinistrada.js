var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('AulaMinistrada', {
        dataAula: {
            type: Sequelize.DATE,
            allowNull: false
        },
        aulas: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};