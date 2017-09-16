/**
 * Created by ander on 2017-05-09.
 */
var express = require('express');
var router = express.Router();
var ClientService = require('./api/client');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('client', { title: 'T1 Interview' });
});

router.get('/:client_name', function(req, res) {
    var client_name = req.params.client_name;

    var query = {
        'pathName': client_name
    };

    ClientService.findClient(query, function(err, client) {
        res.render('client', { title : 'T1 Interview', client : client[0] });
    });
});

router.post('/', function(req, res) {
    ClientService.saveClient(req.body, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.redirect('/');
    });
});

router.post('/:client_name', function(req, res) {
    var client_name = req.params.client_name;
    console.log(client_name);
});

module.exports = router;
