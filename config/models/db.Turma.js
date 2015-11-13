var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Turma', {
        sigla: {
            type: Sequelize.STRING(20),
            allowNull: false,
            validate:{
            	is:{
            		args: [/^[A-Z]{3}-\d-\d{4}-\d$/],
            		msg: 'a sigla possui um formato inválido.'
            	}
            }
        },
        ano: {
            type: Sequelize.STRING(4),
            allowNull: false,
            validate:{
            	is:{
            		args: [/^\d{4}$/],
            		msg: 'o ano possui um formato inválido.'
            	}
            }
        },
        semestre: {
            type: Sequelize.STRING(1),
            allowNull: false,
            validate:{
            	is:{
            		args: [/^\d{1,2}$/],
            		msg: 'o semestre possui um formato inválido.'
            	}
            }
        }
    }, {
        freezeTableName: true
    });
};