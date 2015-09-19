var sequelize = require('../config/sequelize').getSequelize(),
    Turma = sequelize.model('Turma');

exports.obterPorId = function(id) {
    return Turma.findById(id);
};

exports.novaTurma = function(dados) {
    return Turma.create(dados,
        {
            fields: ['sigla', 'ano', 'semestre']
        });
};

exports.salvarAlteracoes = function(turma, alteracoes) {
    return turma.updateAttributes(alteracoes);
};

exports.excluirTurma = function(turma) {
    return turma.destroy();
};

exports.listarTurmas = function() {
    return Turma.findAll();
};