var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Professor', {
        prontuario: {
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true,
           validate: {
                is: {
                    args: [/^\d{6}\-\d{1}$/],
                    msg: 'O prontuário possui um formato inválido.'
                }
            }
        },
        nome: {
            type: Sequelize.STRING(100),
            allowNull: false,
           validate: {
                len: {
                    args: [3,100],
                    msg: 'O Nome deve possuir entre 3 e 100 caracteres.'
                }
            }
        },
        sobrenome: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [3,100],
                    msg: 'O Sobrenome deve possuir entre 3 e 100 caracteres.'
                }
            }
        },
        email: {
            type: Sequelize.STRING(150),
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'O E-Mail informado não é válido.'
                }
            }
        }
    }, {
        freezeTableName: true
    });
};