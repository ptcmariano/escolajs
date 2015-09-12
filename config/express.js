/**
 * Created by edupsousa on 03/09/15.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

module.exports = function() {
    var app = express();
        
    configurarTemplates(app);
    adicionarMiddlewares(app);
    definirRotasDaAplicacao(app);
    adicionarTratamentoDeRotasInexistentes(app);
    adicionarTratamentoDeErros(app);

    return app;
};

function configurarTemplates(app) {
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');
}

function adicionarMiddlewares(app) {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'chave'
    }));
    app.use(flash());
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(passport.initialize());
    app.use(passport.session());
}

function definirRotasDaAplicacao(app) {
    app.use(require('../routes'));
}

function adicionarTratamentoDeRotasInexistentes(app) {
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}

function adicionarTratamentoDeErros(app) {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}