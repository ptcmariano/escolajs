var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Area', {
        area: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true
    });
};