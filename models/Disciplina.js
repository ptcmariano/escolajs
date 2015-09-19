var sequelize = require('../config/sequelize').getSequelize(),
    Disciplina = sequelize.model('Disciplina');

exports.obterPorId = function(id) {
    return Disciplina.findById(id);
};

exports.novaDisciplina = function(dados) {
    return Disciplina.create(dados,
        {
            fields: ['disciplina', 'sigla']
        });
};

exports.salvarAlteracoes = function(disciplina, alteracoes) {
    return disciplina.updateAttributes(alteracoes);
};

exports.excluirDisciplina = function(disciplina) {
    return disciplina.destroy();
};

exports.listarDisciplinas = function() {
    return Disciplina.findAll();
};