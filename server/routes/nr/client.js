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
    console.log(client)
    res.render('nr/client', {
        title: 'NR Client',
        role: req.session.role,
        options: {},
        client: client[0]
    });
});

module.exports = router;