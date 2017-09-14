/**
 * Created by ander on 2017-09-13.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('new_user', { role: req.session.role });
});

module.exports = router;
