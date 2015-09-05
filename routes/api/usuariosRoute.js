/**
 * Created by edupsousa on 04/09/15.
 */
var router = require('express').Router();
var usuariosCtrl = require('../../controllers/api/usuariosController');

router.route('/')
    .post(usuariosCtrl.novoUsuario);

router.route('/:id')
    .get(usuariosCtrl.exibirUsuario)

module.exports = router;