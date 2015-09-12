var Sequelize = require('sequelize');
module.exports = function(sequelize) {
    return sequelize.define('Aluno', {
        prontuario: {
            type: sequelize.STRING(15),
            allowNull: false,
            unique: true
        },
        nome: {
            type: Sequelize.STRING(100),
            allowNull: false            
        },
        sobrenome: {
            type: Sequelize.STRING(100),
            allowNull: false            
        },
        email: {
            type: sequelize.STRING(150),
            allowNull: false
        }
    });
};