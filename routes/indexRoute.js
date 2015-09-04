/**
 * Created by edupsousa on 03/09/15.
 */
var router = require('express').Router();
var indexCtrl = require('../controllers/indexController');

router.get('/', indexCtrl.renderHomePage);

module.exports = router;