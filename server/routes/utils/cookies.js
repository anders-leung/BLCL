/**
 * Created by ander on 2017-09-13.
 */

var CookieService = {
    createCookie : function(req, initials, role) {
        req.session.initials = initials;
        req.session.role = role;
    },

    readCookie : function(req) {
        var session = req.session;
        if ('initials' in session) {
            return session;
        }
        return null;
    },

    eraseCookie : function(req) {
        req.session = null;
    },

    isLoggedIn : function(req, res, next) {
        if (CookieService.readCookie(req)) {
            next();
        } else {
            res.redirect('/login');
        }
    }
};

module.exports = CookieService;