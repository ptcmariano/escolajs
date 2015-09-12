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
    require('./models/db.Usuario')(sequelize);
    require('./models/db.Aluno')(sequelize);
}

function createConnection() {
    return new Sequelize(getDbUrl(), {
        dialect: 'sqlite'
    });
}

function getDbUrl() {
    return 'sqlite://escolajs.db';
}