var Sequelize = require('sequelize');
var singleton = null;

module.exports.getSequelize = function() {
    if (singleton == null) {
        singleton = createConnection();
        configureModels(singleton);
    }

    return singleton;
};

function configureModels(sequelize) {
    var Usuario = require('./models/db.Usuario')(sequelize),
        Aluno = require('./models/db.Aluno')(sequelize),
        Area = require('./models/db.Area')(sequelize),
        Curso = require('./models/db.Curso')(sequelize),
        Disciplina = require('./models/db.Disciplina')(sequelize),
        Turma = require('./models/db.Turma')(sequelize),
        DisciplinaOfertada = require('./models/db.DisciplinaOfertada')(sequelize),
        MatriculaDisciplina = require('./models/db.MatriculaDisciplina')(sequelize),
        ListaPresenca = require('./models/db.ListaPresenca')(sequelize),
        AulaMinistrada = require('./models/db.AulaMinistrada')(sequelize),
        AtribuicaoDisciplina = require('./models/db.AtribuicaoDisciplina')(sequelize),
        Professor = require('./models/db.Professor')(sequelize);

    Curso.belongsTo(Area);
    Disciplina.belongsTo(Curso);
    Turma.belongsTo(Curso);
    DisciplinaOfertada.belongsTo(Turma);
    DisciplinaOfertada.belongsTo(Disciplina);
    MatriculaDisciplina.belongsTo(DisciplinaOfertada);
    MatriculaDisciplina.belongsTo(Aluno);
    ListaPresenca.belongsTo(MatriculaDisciplina);
    ListaPresenca.belongsTo(AulaMinistrada);
    AulaMinistrada.belongsTo(DisciplinaOfertada);
    AtribuicaoDisciplina.belongsTo(DisciplinaOfertada);
    AtribuicaoDisciplina.belongsTo(Professor);
}

function createConnection() {
    return new Sequelize(getDbUrl(), {
        dialect: 'sqlite',
        logging: function() {}
    });
}

function getDbUrl() {
    return 'sqlite://escolajs.db';
}