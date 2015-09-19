var sequelize = require('../config/sequelize').getSequelize(),
    Curso = sequelize.model('Curso');

exports.obterPorId = function(id) {
    return Curso.findById(id);
};

exports.novoCurso = function(dados) {
    return Curso.create(dados,
        {
            fields: ['curso', 'sigla']
        });
};

exports.salvarAlteracoes = function(curso, alteracoes) {
    return curso.updateAttributes(alteracoes);
};

exports.excluirCurso = function(curso) {
    return curso.destroy();
};

exports.listarCursos = function() {
    return Curso.findAll();
};