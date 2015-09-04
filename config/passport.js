/**
 * Created by edupsousa on 03/09/15.
 */
var passport = require('passport');
var Usuario = require('../models/Usuario');

module.exports = function() {

    configurarSessao(passport);
    configurarAutenticacaoLocal(passport);

    return passport;
};

function configurarSessao(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Usuario.obterPorId(id, function(err, usuario) {
            done(err, usuario);
        });
    });
}

function configurarAutenticacaoLocal(passport) {
    require('./strategies/local')(passport);
}