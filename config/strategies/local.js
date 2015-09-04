/**
 * Created by edupsousa on 03/09/15.
 */
var LocalStrategy = require('passport-local').Strategy;
var Usuario = require('../../models/Usuario');

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'usuario',
        passwordField: 'senha'
    }, function(nomeUsuario, senha, done) {
        Usuario.autenticar(nomeUsuario, senha, function(err, usuario) {
            if (usuario === null) {
                done(null, false, {message: 'Usuário ou Senha incorretos!'});
            } else {
                done(null, usuario);
            }
        });
    }));
}