var sequelize = require('../config/sequelize').getSequelize(), 
Professor = sequelize.model('Professor');

exports.obterPorId = function(id) {
    return Professor.findById(id);
};

exports.novoProfessor = function(dados) {
    return Professor.create(dados,
        {
            fields: ['prontuario', 'nome', 'sobrenome', 'email']
        });
};

exports.salvarAlteracoes = function(professor, alteracoes) {
    return professor.updateAttributes(alteracoes);
};

exports.excluirProfessor = function(professor) {
    return professor.destroy();
};

exports.listarProfessores = function() {
    return Professor.findAll();
};