/**
 * Created by ander on 2017-09-13.
 */

var CookieService = {
    createCookie : function(req, email, role) {
        req.session.email = email;
        req.session.role = role;
    },

    readCookie : function(req) {
        var session = req.session;
        if ('email' in session) {
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