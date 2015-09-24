var sequelize = require('../config/sequelize').getSequelize(),
    Aluno = sequelize.model('Aluno');

exports.obterPorId = function(id) {
    return Aluno.findById(id);
};

exports.novaInstancia = function(dados) {
    return Aluno.create(dados,
        {
            fields: ['prontuario', 'nome', 'sobrenome', 'email']
        });
};

exports.salvarAlteracoes = function(aluno, alteracoes) {
    return aluno.updateAttributes(alteracoes);
};

exports.excluirInstancia = function(aluno) {
    return aluno.destroy();
};

exports.listarInstancias = function() {
    return Aluno.findAll();
};