/**
 * Created by ander on 2017-06-02.
 */

var Client = require('../models/client');
var WriteExcelService = require('./write_excel');
var clientNames = require('./utils/client');

var ClientService = {
    saveClient : function(params, callback) {
        var client = new Client(params);
        for (var field in client) {
            if (field == 'prSold') {
                client[field] = client[field] == 'Y';
                continue;
            }
            if (field == 'email') continue;
            if (typeof(client[field]) == 'string') {
                client[field] = client[field].toUpperCase();
            }
        }
        client.fileName = clientNames.getFileName(client);
        client.pathName = clientNames.getPathName(client);
        client.save(function(err) {
            Client.findOne({ pathName : client.pathName }, function(err, client) {
                WriteExcelService(client.year, client);
            });
            callback(err, client);
        });
    },

    findClient : function(params, callback) {
        Client.find(params).lean().exec(function(err, client) {
            callback(err, client);
        });
    },

    findClientsOSPyt : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['packed'] = false;
        search['signed'] = { $ne : '' };
        search['emailed'] = { $ne : '' };
        search['pytReceived'] = '';
        search['pytAmount'] = '';
        var or = [];
        or.push({ 'interviewDate' : { $ne : '' }});
        or.push({ 'packed' : true });
        or.push({ 'signed' : { $ne : '' }});
        or.push({ 'pytReceived' : '' });
        or.push({ 'pytAmount' : '' });
        search['$or'] = or;
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsEmailedNotPacked : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['packed'] = false;
        search['signed'] = { $ne : '' };
        search['emailed'] = { $ne : '' };
        search['pytReceived'] = { $ne : '' };
        search['pytAmount'] = { $ne : '' };
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsEmailed : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['emailed'] = { $ne : '' };
        search['signed'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsPacked : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['packed'] = true;
        search['emailed'] = '';
        search['signed'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsPytRec : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['pytReceived'] = { $ne : '' };
        search['pytAmount'] = { $ne : '' };
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findAllOtherClients : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['packed'] = false;
        search['emailed'] = '';
        search['signed'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findAllClients : function(callback) {
        Client.find({}).lean().exec(function(err, clients) {
            callback(err, clients);
        })
    },

    updateClient : function(search, values, callback) {
        for (var field in values) {
            if (field == 'prSold' || field == 'donation' || field == 'medExp') {
                values[field] = values[field] == 'Y';
                continue;
            }
            if (field == 'email') continue;
            if (typeof(values[field]) == 'string') {
                values[field] = values[field].toUpperCase();
            }
        }
        var oldYear;
        Client.findOne(search, function(err, client) {
            oldYear = client.year;
            Client.update(search, { $set: values }, function(save_err) {
                Client.findOne(search, function(find_err, client) {
                    WriteExcelService(oldYear, client);
                    callback(save_err, client);
                });
            });
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

    findClientsWithUser : function(user, all, callback) {
        var search = {};
        search['preparer'] = user;
        if (!all) search['readyToPack'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsWithUserNew : function(user, callback) {
        var search = {};
        search['preparer'] = user;
        search['preparerDone'] = '';
        search['readyToPack'] = '';
        search['emailed'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsWithUserWIP : function(user, callback) {
        var search = {};
        search['preparer'] = user;
        search['preparerDone'] = 'WIP';
        search['readyToPack'] = '';
        search['emailed'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsWithUserOK : function(user, callback) {
        var search = {};
        search['preparer'] = user;
        search['preparerDone'] = 'OK';
        search['readyToPack'] = '';
        search['emailed'] = '';
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsWithUserEmailed : function(user, callback) {
        var search = {};
        search['preparer'] = user;
        search['preparerDone'] = 'OK';
        search['readyToPack'] = '';
        search['emailed'] = { $ne : '' };
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsPreparerDone : function(user, callback) {
        var search = {};
        search['preparer'] = user;
        search['preparerDone'] = 'OK';
        search['readyToPack'] = { $ne : '' };
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsDone : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['preparer'] = { $ne : '' };
        search['preparerDone'] = 'OK';
        search['pytReceived'] = { $ne : '' };
        search['pytAmount'] = { $ne : '' };
        search['signed'] = { $ne : '' };
        search['packed'] = true;
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
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