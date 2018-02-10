/**
 * Created by ander on 2017-06-02.
 */

var Client = require('../models/client');
var WriteExcelService = require('./write_excel');
var clientNames = require('./utils/client');
var async = require('async');

function cleanValues(values) {
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

    return values;
}

var ClientService = {
    saveClient : function(values, callback) {
        values = cleanValues(values);
        var client = new Client(values);

        client.fileName = clientNames.getFileName(client);
        client.pathName = clientNames.getPathName(client);
        
        client.save(function(err) {
            WriteExcelService(client.year, client);
            if (err) console.log(err);
            callback(err, client);
        });
    },

    findClient : function(params, callback) {
        Client.find(params).lean().exec(function(err, client) {
            callback(err, client);
        });
    },

    findClientsOSPyt : function(callback) {
        var emailed = {};
        emailed['interviewDate'] = { $ne : '' };
        emailed['packed'] = false;
        emailed['signed'] = { $ne : '' };
        emailed['emailed'] = { $ne : '' };
        emailed['$or'] = [
            { 'pytReceived' : '' },
            { 'pytAmount' : '' },
            { 'recBy' : '' },
        ]
        var normal = {};
        normal['interviewDate'] = { $ne : '' };
        normal['packed'] = true ;
        normal['signed'] = { $ne : '' };
        normal['$or'] = [
            { 'pytReceived' : '' },
            { 'pytAmount' : '' },
            { 'recBy' : '' },
        ]
        Client.find({ $or: [emailed, normal] }).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsNoPreparer : function(callback) {
        var search = {};
        search['preparer'] = '';
        search['interviewDate'] = { $ne : '' };
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
        search['recBy'] = { $ne : '' };
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
        search['recBy'] = { $ne : '' };
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findAllOtherClients : function(callback) {
        var search = {};
        search['preparer'] = { $ne : '' };
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
        Client.findOne(search, function(err, oldClient) {
            oldYear = oldClient.year;
            oldFileName = oldClient.fileName;
            values = cleanValues(values);
            Client.update(search, { $set: values }, function(save_err) {
                Client.findOne(search, function(find_err, client) {
                    var updates = {}
                    updates['fileName'] = clientNames.getFileName(client);
                    updates['pathName'] = clientNames.getPathName(client);
                    Client.update(search, { $set: updates }, function(file_name_err) {
                        if (file_name_err) console.log(file_name_err);
                        var id_search = { _id: oldClient._id };
                        Client.findOne(id_search, function(err, client) {
                            WriteExcelService(oldYear, client, oldFileName);
                            if (err) console.log(err);
                            if (save_err) console.log(save_err);
                            callback(save_err, client);
                        });
                    });
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

    findClientsWithUser : function(user, filter, callback) {
        var search = {};
        search['preparer'] = user;
        if (!filter) search['readyToPack'] = '';
        else if (filter.done) {
            search['interviewDate'] = { $ne : '' };
            search['preparerDone'] = 'OK';
            search['pytReceived'] = { $ne : '' };
            search['pytAmount'] = { $ne : '' };
            search['signed'] = { $ne : '' };
            search['packed'] = true;
        }
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
        search['recBy'] = { $ne : '' };
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