var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Professor', {
        prontuario: {
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true,
            validate: { 
                is: /d{5}-\d{1}/
            }
        },
        nome: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: { 
                isAlpha: true,
                len: [2,100]
            }
        },
        sobrenome: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: { 
                isAlpha: true,
                len: [2,100]             
            }
        },
        email: {
            type: Sequelize.STRING(150),
            allowNull: false,
            validate: { 
                isEmail: true,
                len: [0,150]  
            }
        }
    }, {
        freezeTableName: true
    });
};