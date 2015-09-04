/**
 * Created by edupsousa on 03/09/15.
 */
var passport = require('passport');

exports.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.mostrarLogin = function(req, res) {
    res.render('login', {
        messages: req.flash('error') || req.flash('info')
    });
};