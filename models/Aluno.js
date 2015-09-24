var sequelize = require('../config/sequelize').getSequelize(),
    Aluno = require('../components/ModeloBase')(sequelize.model('Aluno'));

Aluno.definirCamposAtualizaveis(['prontuario', 'nome', 'sobrenome', 'email']);

module.exports = Aluno;