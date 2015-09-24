var sequelize = require('../config/sequelize').getSequelize(),
    Turma = require('../components/ModeloBase')(sequelize.model('Turma'));

Turma.definirCamposAtualizaveis(['sigla', 'ano', 'semestre']);

module.exports = Turma;