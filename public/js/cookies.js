/**
 * Created by ander on 2017-09-13.
 */

var CookieService = {
    createCookie : function(req, email, role) {
        req.session.email = email;
        req.session.role = role;
    },

    readCookie : function(req) {
        if (req.session == null) {
            return null;
        }
        return req.session
    },

    eraseCookie : function(req) {
        req.session = null;
    }
};

module.exports = CookieService;