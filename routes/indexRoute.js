/**
 * Created by edupsousa on 03/09/15.
 */
var router = require('express').Router();
var indexCtrl = require('../controllers/indexController'),
    autenticacaoCtrl = require('../controllers/autenticacaoController');

router.get('/', indexCtrl.renderHomePage);

router.route('/login')
    .get(autenticacaoCtrl.mostrarLogin)
    .post(autenticacaoCtrl.login);
router.get('/logout', autenticacaoCtrl.logout);

module.exports = router;