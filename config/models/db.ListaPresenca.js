var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('ListaPresenca', {
        faltas: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};