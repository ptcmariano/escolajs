var sequelize = require('../config/sequelize').getSequelize(),
    Aluno = sequelize.model('Aluno');

exports.obterPorId = function(id) {
    return Aluno.findById(id);
};

exports.novoAluno = function(dados) {
    return Aluno.create(dados,
        {
            fields: ['prontuario', 'nome', 'sobrenome', 'email']
        });
};

exports.salvarAlteracoes = function(aluno, alteracoes) {
    return aluno.updateAttributes(alteracoes);
};

exports.excluirAluno = function(aluno) {
    return aluno.destroy();
};

exports.listarAlunos = function() {
    return Aluno.findAll();
};