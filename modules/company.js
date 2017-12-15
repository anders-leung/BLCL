/**
 * Created by ander on 2017-12-04.
 */
var Company = require('../models/Company');

var CompanyService = {
    getAllCompanies : function(callback) {
        Company.find({}).lean().exec(function(err, companies) {
            callback(err, companies);
        });
    },

    getT2Companies : function(params, callback) {
        var search = {};
        search['t2'] = params;
        Company.find(search).lean().exec(function(err, companies) {
            callback(err, companies);
        })
    },

    getT4Companies : function(params, callback) {
        var search = {};
        search['t4'] = params;
        Company.find(search).lean().exec(function(err, companies) {
            callback(err, companies);
        })
    },

    getT5Companies : function(params, callback) {
        var search = {};
        search['t5'] = params;
        Company.find(search).lean().exec(function(err, companies) {
            callback(err, companies);
        })
    }
};

module.exports = CompanyService;