var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Disciplina', {
        disciplina: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [3,100],
                    msg: 'O Nome da disciplina deve possuir entre 3 e 100 caracteres.'
                }
            }
        },
        sigla: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [3,20],
                    msg: 'O Nome da disciplina deve possuir entre 3 e 20 caracteres.'
               }    
            }
        }
    }, {
        freezeTableName: true
    });
};