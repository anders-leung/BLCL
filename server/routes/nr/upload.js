let express = require('express');
let router = express.Router();
let to = require('../../helpers/to');

let CookieService = require('../utils/cookies');
let ContactList = require('../../modules/nr/imports/contact_list');
let UserDefined = require('../../modules/nr/imports/user_defined');
let ImportProfile = require('../../modules/nr/imports/profile');

router.get('/', CookieService.isLoggedIn, function(req, res) {
    res.render('nr/upload', {
        role: req.session.role,
        options: {}
    });
});

router.post('/', function(req, res) {
    let type = req.body.type.toLowerCase();
    if (type == 'maximizer - contact list') {
        ContactList(req.body.filepath);
    } else if (type == 'maximizer - user defined') {
        UserDefined(req.body.filepath);
    } else {
        ImportProfile(req.body.filepath);
    }
});

module.exports = router;