var sequelize = require('./config/sequelize').getSequelize();
var passport = require('./config/passport')();
var express = require('./config/express');

var app = express();

app.sequelize = sequelize;

module.exports = app;
