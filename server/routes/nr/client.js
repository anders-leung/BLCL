let express = require('express');
let router = express.Router();

let CookieService = require('../utils/cookies');
let ClientService = require('../../modules/nr/client');

/* GET home page. */
router.get('/*', CookieService.isLoggedIn, async (req, res) => {
    let err, client;
    const { params } = req;

    if (params[0]) {
        query = { _id: params[0] };
        [err, client] = await ClientService.find(query);
        if (err) {
            console.log('NR service find err: ', err);
            return res.render(err);
        }
        client = client[0];
    }

    res.render('nr/client', {
        title: 'NR Client',
        role: req.session.role,
        options: {},
        client
    });
});

router.post('/*', CookieService.isLoggedIn, async (req, res, next) => {
    let query, err, result;
    const { params, body } = req;

    if (params[0]) {
        query = { _id: params[0] };
    }

    const commaSeparated = ['phones', 'emails'];

    Object.keys(body).map((key) => {
        if (body[key] === 'on') {
            body[key] = {};
        } else if (commaSeparated.includes(key)) {
            body[key] = body[key].replace(/\s/g, '').split(',');
        }
    });

    if (query) {
        [err, result] = await ClientService.update(query, body);
    } else {
        [err, result] = await ClientService.create(body);
    }

    if (err) return next(err);
    res.redirect('/nr/directory');
});

module.exports = router;