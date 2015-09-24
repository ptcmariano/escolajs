var sequelize = require('../config/sequelize').getSequelize(), 
    Professor = require('../components/ModeloBase')(sequelize.model('Professor'));

Professor.definirCamposAtualizaveis(['prontuario', 'nome', 'sobrenome', 'email']);

module.exports = Professor;