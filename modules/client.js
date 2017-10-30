/**
 * Created by ander on 2017-06-02.
 */

var Client = require('../models/Client');
var clientNames = require('./utils/client');

var ClientService = {
    saveClient : function(params, callback) {
        var client = new Client(params);
        client.fileName = clientNames.getFileName(client);
        client.pathName = clientNames.getPathName(client);
        client.save(function(err) {
            callback(err, client);
        });
    },

    findClient : function(params, callback) {
        Client.find(params).lean().exec(function(err, client) {
            callback(err, client);
        });
    },

    findClientsPickedupNotPaid : function(callback) {
        var search = {};
        search['pickedUp'] = true;
        search['pytReceived'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsEmailedNotPaid : function(callback) {
        var search = {};
        search['emailed'] = { $ne : ''};
        search['pytReceived'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsPacked : function(callback) {
        var search = {};
        search['packed'] = true;
        search['pytReceived'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findAllOtherClients : function(callback) {
        var search = {};
        search['packed'] = false;
        search['pickedUp'] = false;
        search['emailed'] = '';
        search['pytReceived'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    updateClient : function(search, values, callback) {
        Client.update(search, { $set: values }, function(save_err) {
            Client.findOne(search, function(find_err, client) {
                callback(save_err, client);
            })
        });
    },

    findClientsWithIds : function(ids, callback) {
        Client.find({'_id' : { $in: ids }}).lean().exec(function(err, clients) {
            if (err) {
                callback(err);
            } else {
                callback(err, clients);
            }
        });
    },

    getStatuses : function() {
        return Client.schema.path('preparerDone').enumValues;
    },

    getPayments : function() {
        return Client.schema.path('pytReceived').enumValues;
    },

    getMethods : function() {
        return Client.schema.path('method').enumValues;
    },

    getT1135 : function() {
        return Client.schema.path('t1135').enumValues;
    },

    getRelationships : function() {
        return Client.schema.path('dependent1.relationship').enumValues;
    }
};

module.exports = ClientService;