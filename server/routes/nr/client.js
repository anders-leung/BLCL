let express = require('express');
let router = express.Router();

let CookieService = require('../utils/cookies');
let ClientService = require('../../modules/nr/client');

/* GET home page. */
router.get('/', CookieService.isLoggedIn, function(req, res) {
    res.render('nr/client', {
        title: 'NR Client',
        role: req.session.role,
        options: {},
        client: null
    });
});

router.get('/:client_name', CookieService.isLoggedIn, async (req, res) => {
    let err, client;
    [err, client] = await ClientService.find({ pathName: req.params.client_name });
    res.render('nr/client', {
        title: 'NR Client',
        role: req.session.role,
        options: {},
        client: client[0]
    });
});

router.post('/', CookieService.isLoggedIn, async (req, res, next) => {
    let err, result;
    [err, result] = await ClientService.create(req.body);
    if (err) return next(err);
    res.redirect('/nr/directory');
});

router.post('/:client_name', CookieService.isLoggedIn, async (req, res, next) => {
    let err, result;
    [err, result] = await ClientService.update({ pathName: req.params.client_name }, req.body);
    if (err) return next(err);
    res.redirect('/nr/directory');
})

module.exports = router;