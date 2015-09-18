var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('AtribuicaoDisciplina', {
        atribuicaoAtiva: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};