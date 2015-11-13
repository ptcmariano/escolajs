var sequelize = require('../../config/sequelize').getSequelize(),
    Oferta = sequelize.model('DisciplinaOfertada'),
    Disciplina = sequelize.model('Disciplina'),
    Turma = sequelize.model('Turma');

exports.novaOferta = function (req, res, next) {
    var disciplinaId = req.body.disciplinaId;
    var turmaId = req.body.turmaId;

    Disciplina.findById(disciplinaId)
        .then(function(disciplina) {
            return Turma.findById(turmaId)
                .then(function(turma) {
                    return Oferta.create(req.body, {
                            fields: ['dataInicio', 'dataEncerramento']
                        })
                        .then(function(oferta) {
                            return oferta.setTurma(turma);
                        })
                        .then(function(oferta) {
                            return oferta.setDisciplina(disciplina)
                        });
                });
        })
        .then(function (instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirOferta = function (req, res) {
    res.json(req.instanciaOferta);
};

exports.editarOferta = function (req, res, next) {

};

exports.excluirOferta = function (req, res, next) {
    req.instanciaOferta.destroy()
        .then(function () {
            res.json(true);
        })
        .catch(next);
};

exports.listarOfertas = function (req, res, next) {
    Oferta.findAll()
        .then(function (instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterOfertaMiddleware = function (req, res, next, id) {
    Oferta.findById(id)
        .then(function (instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaOferta = instancia;
                next();
            }
        })
        .catch(next);
};
