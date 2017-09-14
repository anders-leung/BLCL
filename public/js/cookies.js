/**
 * Created by ander on 2017-09-13.
 */

var CookieService = {
    createCookie : function(name, value, hours) {
        var expires = '';
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime() + hours*60*60*1000);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    },

    readCookie : function(name, callback) {
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var tokens = ca[i].split('=');
            if (tokens[0] == name) {
                callback(tokens[1]);
            }
        }
        callback(null);
    },

    eraseCookie : function() {
        document.cookie = '';
    }
};

module.exports = CookieService;