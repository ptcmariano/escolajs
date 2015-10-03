var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Professor', {
        prontuario: {
            type: Sequelize.STRING(7),
            allowNull: false,
            unique: true,
            validate: {
                len: [7,7],
                is: /^\d{5}-\d{1}$/
            }
        },
        nome: {
            type: Sequelize.STRING(100),
            allowNull: false,
            
        },
        sobrenome: {
            type: Sequelize.STRING(100),
            allowNull: false,
            
        },
        email: {
            type: Sequelize.STRING(150),
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    }, {
        freezeTableName: true
    });
};