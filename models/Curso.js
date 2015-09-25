var sequelize = require('../config/sequelize').getSequelize(),
    Area = require('../components/ModeloBase')(sequelize.model('Area')),
    Curso = require('../components/ModeloBase')(sequelize.model('Curso'));

Curso.definirCamposAtualizaveis(['curso', 'sigla']);
Curso.estenderInstancia('setArea', function(idArea) {
    var instanciaCurso = this;

    return Area.obterPorId(idArea)
        .then(function(area) {
            return instanciaCurso.dbInstancia.setArea(area.dbInstancia);
        })
        .then(function(dbCurso) {
            return Curso.criarInstancia(dbCurso);
        })
        .catch(function(error) {
            throw error;
        });
});

module.exports = Curso;