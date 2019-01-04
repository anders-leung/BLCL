/**
 * Created by ander on 2018-12-24.
 */

const express = require('express');
const router = express.Router();

const CookieService = require('../utils/cookies');
const TemplateService = require('../../modules/template/template');

/* GET home page. */
router.get('/*', CookieService.isLoggedIn, async (req, res) => {
    const { params } = req;
    
    const [err, templates] = await TemplateService.get();
    
    if (err) return res.render('error');

    res.render('clients/templates', {
        templates,
        directory: global.templateDirectory,
        role: req.session.role,
        options: {}
    });
});


module.exports = router;