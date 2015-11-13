var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Area', {
        area: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
            validate:{
            	 len: {
                     args: [3,100],
                     msg: 'A area deve possuir entre 3 e 100 caracteres.'
                 }
            }
        }
    }, {
        freezeTableName: true
    });
};