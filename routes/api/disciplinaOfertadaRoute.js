var router = require('express').Router();
var disciplinaOfertadaCtrl = require('../../controllers/api/disciplinaOfertadaController');

router.route('/')
    .get(disciplinaOfertadaCtrl.listarOfertas)
    .post(disciplinaOfertadaCtrl.novaOferta);

router.param('idOferta', disciplinaOfertadaCtrl.obterOfertaMiddleware);

router.route('/:idOferta')
    .get(disciplinaOfertadaCtrl.exibirOferta)
    .put(disciplinaOfertadaCtrl.editarOferta)
    .delete(disciplinaOfertadaCtrl.excluirOferta);

module.exports = router;