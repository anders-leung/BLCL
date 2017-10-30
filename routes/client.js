/**
 * Created by ander on 2017-05-09.
 */
var express = require('express');
var router = express.Router();

var CookieService = require('./utils/cookies');
var ClientService = require('./../modules/client');
var ConfigService = require('./../modules/config');
var WriteExcelService = require('./../modules/write_excel');

var t1Directory;

ConfigService.getT1Directory(function(err, directory) {
    if (directory) {
        t1Directory = directory;
    } else {
        console.log(err);
    }
});

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    res.render('client', { title: 'T1 Interview',
        client : null,
        options : {
            method : ClientService.getMethods(),
            t1135 : ClientService.getT1135(),
            relationship : ClientService.getRelationships()
        }
    });
});

router.get('/:client_name', CookieService.isLoggedIn, function(req, res) {
    var client_name = req.params.client_name;

    var query = {
        'pathName': client_name
    };

    ClientService.findClient(query, function(err, client) {
        res.render('client', {
            title : 'T1 Interview',
            client : client[0],
            options : {
                method : ClientService.getMethods(),
                t1135 : ClientService.getT1135(),
                relationship : ClientService.getRelationships()
            }
        });
    });
});

router.post('/', function(req, res) {
    ClientService.saveClient(req.body, function(err, client) {
        if (err) {
            res.render('error');
        } else {
            WriteExcelService(t1Directory + '//' + client.fileName, client);
            res.redirect('/');
        }
    });
});

router.post('/:client_name', function(req, res) {
    var client_name = req.params.client_name;
    ClientService.updateClient({ pathName : client_name }, req.body, function(err, client) {
        if (err) {
            res.render('error');
        }
        WriteExcelService(t1Directory + '//' + client.fileName, client);
        res.redirect('/')
    })
});

module.exports = router;
