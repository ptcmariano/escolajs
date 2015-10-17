var sequelize = require('../../config/sequelize').getSequelize(),
    Curso = sequelize.model('Curso');

exports.novoCurso = function (req, res, next) {
    return Curso.create(req.body, {
        fields: ['curso', 'sigla']
    })
        .then(function (instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirCurso = function (req, res) {
    res.json(req.instanciaCurso);
};

exports.editarCurso = function (req, res, next) {
    req.instanciaCurso.updateAttributes(req.body, {
        fields: ['curso', 'sigla']
    })
        .then(function () {
            res.json(req.instanciaCurso);
        })
        .catch(next);
};

exports.excluirCurso = function (req, res, next) {
    req.instanciaCurso.destroy()
        .then(function () {
            res.json(true);
        })
        .catch(next);
};

exports.listarCursos = function (req, res, next) {
    Curso.findAll()
        .then(function (instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterCursoMiddleware = function (req, res, next, id) {
    Curso.findById(id)
        .then(function (instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaCurso = instancia;
                next();
            }
        })
        .catch(next);
};
