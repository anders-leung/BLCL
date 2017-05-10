/**
 * Created by ander on 2017-05-09.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('client', { title: 'T1 Interview' });
});

module.exports = router;
