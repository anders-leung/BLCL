/**
 * Created by ander on 2017-10-27.
 */
var Config = require('../models/config');
const to = require('../helpers/to');

var ConfigService = {
    setT1Directory : function(directory, callback) {
        Config.findOne({}, function(err, config) {
            if (!config) config = new Config();
            directory = directory.substring(0, directory.length - 5);
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
    },

    getInvoiceDirectory: async () => {
        const [err, config] = await to(Config.findOne({}));
        return [err, config.invoice_directory];
    },

    getTax: async () => {
        const [err, config] = await to(Config.findOne({}).lean());
        if (err) return [err, null];
        if (!config) return [new Error('General config not set up'), null];
        const tax = {
            gst: config.gst || '0.05',
            pst: config.pst || '0.07',
        }
        return [null, tax];
    },

    getConfig: async () => {
        return await to(Config.findOne({}).lean());
    }
};

module.exports = ConfigService;