/**
 * Created by ander on 2017-05-09.
 */
var express = require('express');
var router = express.Router();
var readExcel = require('./read_excel');

/* GET read excel page. */
router.get('/', function(req, res, next) {
    var filepath = '../../../Desktop/BLCL/Templates/1- T1 INTERVIEW Feb 19, 2017.xlsx';
    readExcel(filepath);
    res.render('excel', { title: 'T1 upload' })
});

router.post('/', function(req, res, next) {
    var fileNamesString = req.body.fileNames;
    var fileNames = fileNamesString.split(",");
    for (var i = 0; i < fileNames.length; i++) {
        console.log(fileNames[i]);
    }

    //res.redirect('/');
});

module.exports = router;
