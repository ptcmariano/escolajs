var sequelize = require('../config/sequelize').getSequelize(),
    Area = sequelize.model('Area');

exports.obterPorId = function(id) {
    return Area.findById(id);
};

exports.novaArea = function(dados) {
    return Area.create(dados,
        {
            fields: ['area']
        });
};

exports.salvarAlteracoes = function(area, alteracoes) {
    return area.updateAttributes(alteracoes);
};

exports.excluirArea = function(area) {
    return area.destroy();
};

exports.listarArea = function() {
    return Area.findAll();
};