var sequelize = require('../../config/sequelize').getSequelize(),
    Disciplina = sequelize.model('Disciplina');

exports.novaDisciplina = function(req, res, next) {
    return Disciplina.create(req.body, {
        fields: ['disciplina', 'sigla']
    })
        .then(function(instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirDisciplina = function(req, res) {
    res.json(req.instanciaDisciplina);
};

exports.editarDisciplina = function(req, res, next) {
    req.instanciaDisciplina.updateAttributes(req.body, {
        fields: ['disciplina', 'sigla']
    })
        .then(function() {
            res.json(req.instanciaDisciplina);
        })
        .catch(next);
};

exports.excluirDisciplina = function(req, res, next) {
    req.instanciaDisciplina.destroy()
        .then(function() {
            res.json(true);
        })
        .catch(next);
};

exports.listarDisciplinas = function(req, res, next) {
    Disciplina.findAll()
        .then(function(instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterDisciplinaMiddleware = function(req, res, next, id) {
    Disciplina.findById(id)
        .then(function(instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaDisciplina = instancia;
                next();
            }
        })
        .catch(next);
};
