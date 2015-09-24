var sequelize = require('../config/sequelize').getSequelize(),
    Disciplina = require('../components/ModeloBase')(sequelize.model('Disciplina'));

Disciplina.definirCamposAtualizaveis(['disciplina', 'sigla']);

module.exports = Disciplina;