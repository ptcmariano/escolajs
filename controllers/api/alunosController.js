var sequelize = require('../../config/sequelize').getSequelize(),
    Aluno = sequelize.model('Aluno');

exports.novoAluno = function (req, res, next) {
    return Aluno.create(req.body, {
        fields: ['prontuario', 'nome', 'sobrenome', 'email']
    })
        .then(function (instancia) {
            res.json(instancia);
        })
        .catch(next);
};

exports.exibirAluno = function (req, res) {
    res.json(req.instanciaAluno);
};

exports.editarAluno = function (req, res, next) {
    req.instanciaAluno.updateAttributes(req.body, {
        fields: ['prontuario', 'nome', 'sobrenome', 'email']
    })
        .then(function () {
            res.json(req.instanciaAluno);
        })
        .catch(next);
};

exports.excluirAluno = function (req, res, next) {
    req.instanciaAluno.destroy()
        .then(function () {
            res.json(true);
        })
        .catch(next);
};

exports.listarAlunos = function (req, res, next) {
    Aluno.findAll()
        .then(function (instancias) {
            res.json(instancias);
        })
        .catch(next);
};

exports.obterAlunoMiddleware = function (req, res, next, id) {
    Aluno.findById(id)
        .then(function (instancia) {
            if (instancia === null) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                req.instanciaAluno = instancia;
                next();
            }
        })
        .catch(next);
};
