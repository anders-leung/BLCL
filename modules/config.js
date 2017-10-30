/**
 * Created by ander on 2017-10-27.
 */
var Config = require('../models/Config');

var ConfigService = {
    setT1Directory : function(directory, callback) {
        Config.findOne({}, function(err, config) {
            if (!config) config = new Config();
            config.t1_directory = directory;
            config.save(function(err) {
                callback(err);
            });
        })
    },

    getT1Directory : function(callback) {
        Config.findOne({}, function(err, config) {
            if (config) callback(err, config.t1_directory);
            else callback(err, null);
        });
    }
};

module.exports = ConfigService;