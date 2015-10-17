var sequelize = require('../../config/sequelize').getSequelize(),
    Turma = sequelize.model('Turma');

exports.novaTurma = function(req, res, next) {
    return Turma.create(req.body, {
        fields: ['sigla', 'ano', 'semestre']
    })
        .then(function(instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirTurma = function(req, res) {
    res.json(req.instanciaTurma);
};

exports.editarTurma = function(req, res, next) {
    req.instanciaTurma.updateAttributes(req.body, {
        fields: ['sigla', 'ano', 'semestre']
    })
        .then(function() {
            res.json(req.instanciaTurma);
        })
        .catch(next);
};

exports.excluirTurma = function(req, res, next) {
    req.instanciaTurma.destroy()
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarTurmas = function(req, res, next) {
    Turma.findAll()
        .then(function(instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterTurmaMiddleware = function(req, res, next, id) {
    Turma.findById(id)
        .then(function(instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaTurma = instancia;
                next();
            }
        })
        .catch(next);
};
