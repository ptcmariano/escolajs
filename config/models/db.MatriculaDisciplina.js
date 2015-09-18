var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('MatriculaDisciplina', {
        tipo: {
            type: Sequelize.ENUM('regular','dependencia'),
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};