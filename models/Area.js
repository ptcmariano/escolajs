var sequelize = require('../config/sequelize').getSequelize(),
    Area = require('../components/ModeloBase')(sequelize.model('Area'));

Area.definirCamposAtualizaveis(['area']);

module.exports = Area;