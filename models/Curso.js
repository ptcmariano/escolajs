var sequelize = require('../config/sequelize').getSequelize(),
    Curso = require('../components/ModeloBase')(sequelize.model('Curso'));

Curso.definirCamposAtualizaveis(['curso', 'sigla']);

module.exports = Curso;