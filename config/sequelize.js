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

    Curso.belongsTo(Area, {foreignKey: 'areaId'});
    Disciplina.belongsTo(Curso, {foreignKey: 'cursoId'});
    Turma.belongsTo(Curso, {foreignKey: 'cursoId'});
    DisciplinaOfertada.belongsTo(Turma, {foreignKey: 'turmaId'});
    DisciplinaOfertada.belongsTo(Disciplina, {foreignKey: 'disciplinaId'});
    MatriculaDisciplina.belongsTo(DisciplinaOfertada, {foreignKey: 'disciplinaOfertadaId'});
    MatriculaDisciplina.belongsTo(Aluno, {foreignKey: 'alunoId'});
    ListaPresenca.belongsTo(MatriculaDisciplina, {foreignKey: 'matriculaDisciplinaId'});
    ListaPresenca.belongsTo(AulaMinistrada, {foreignKey: 'aulaMinistradaId'});
    AulaMinistrada.belongsTo(DisciplinaOfertada, {foreignKey: 'disciplinaOfertadaId'});
    AtribuicaoDisciplina.belongsTo(DisciplinaOfertada, {foreignKey: 'disciplinaOfertadaId'});
    AtribuicaoDisciplina.belongsTo(Professor, {foreignKey: 'professorId'});
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