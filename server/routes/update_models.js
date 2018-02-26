var express = require('express');
var router = express.Router();

var ClientService = require('../modules/client');
var UserService = require('../modules/user');

router.get('/', function(req, res) {
    res.render('update_models');
});

router.post('/', function(req, res) {
    console.log(req.body.defaultValue)
    if (req.body.model == 'client') {
        ClientService.addField(req.body.fieldName, req.body.defaultValue, function(err) {
            if (err) console.log(err);
            res.redirect('/');
        });
    }
})

module.exports = router;