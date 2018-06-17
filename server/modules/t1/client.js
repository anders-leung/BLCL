/**
 * Created by ander on 2017-06-02.
 */
var to = require('../../helpers/to');
var Client = require('../../models/client');
var WriteExcelService = require('./write_excel');
var clientNames = require('../utils/client');
var async = require('async');

function cleanValues(values) {
    for (var field in values) {
        if (field == 'prSold' || field == 'donation' || field == 'medExp') {
            values[field] = values[field] == 'Y';
            continue;
        }
        if (field == 'email.value' || 
            field == 'notes.one' || field == 'notes.two' || field == 'notes.three' ||
            field == 'comments.one' || field == 'comments.two' || field == 'comments.three') continue;
        if (typeof(values[field]) == 'string') {
            values[field] = values[field].toUpperCase().trim();
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
            WriteExcelService(client, client);
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
            { 'taxToCRA' : '' }
        ]
        var normal = {};
        normal['interviewDate'] = { $ne : '' };
        normal['packed'] = true ;
        normal['signed'] = { $ne : '' };
        normal['$or'] = [
            { 'pytReceived' : '' },
            { 'pytAmount' : '' },
            { 'recBy' : '' },
            { 'taxToCRA' : '' }
        ]
        Client.find({ $or: [emailed, normal] }).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsOSSigned: function(callback) {
        var normal = {};
        normal['interviewDate'] = { $ne: '' };
        normal['packed'] = true;
        normal['signed'] = '';
        normal['pytReceived'] = { $ne: '' };
        normal['pytAmount'] = { $ne: '' };
        normal['recBy'] = { $ne: '' };
        normal['taxToCRA'] = { $ne: '' };

        var emailed = {};
        emailed['interviewDate'] = { $ne : '' };
        emailed['packed'] = false;
        emailed['signed'] = '';
        emailed['emailed'] = { $ne : '' };
        emailed['pytReceived'] = { $ne: '' };
        emailed['pytAmount'] = { $ne: '' };
        emailed['recBy'] = { $ne: '' };
        emailed['taxToCRA'] = { $ne: '' };
        
        Client.find({ $or: [normal, emailed] }).lean().exec(function(err, clients) {
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
        search['taxToCRA'] = { $ne : '' };
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsEmailed : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['emailed'] = { $ne : '' };
        search['signed'] = '';
        search['$or'] = [
            { 'pytReceived': '' },
            { 'pytAmount': '' },
            { 'recBy': '' },
            { 'taxToCRA': '' }
        ]
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsPacked : async function(preparer) {
        var search = {};
        var method = 'find';
        if (preparer) {
            search = { preparer: preparer };
            method = 'count';
        }
        search['interviewDate'] = { $ne : '' };
        search['packed'] = true;
        search['emailed'] = '';
        search['signed'] = '';
        search['$or'] = [
            { 'pytReceived' : '' },
            { 'pytAmount' : '' },
            { 'recBy' : '' },
            { 'taxToCRA' : '' }
        ]

        let err, clients;
        [err, clients] = await to(Client[method](search).lean().exec());
        if (err) return err;
        return clients;
    },

    findClientsPytRec : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['pytReceived'] = { $ne : '' };
        search['pytAmount'] = { $ne : '' };
        search['recBy'] = { $ne : '' };
        search['taxToCRA'] = { $ne : '' };
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsT1 : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['t1Efiled'] = '';
        search['t1135'] = { $ne : 'N' };
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsGst : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['gstEfiled'] = '';
        search['$or'] = [
            { 'husband.rental.gstReturn': true },
            { 'husband.selfEmployed.gstReturn': true },
            { 'wife.rental.gstReturn': true },
            { 'wife.selfEmployed.gstReturn': true }
        ]
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    findClientsT1Done : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['t1135'] = { $ne: 'N' };
        search['t1Efiled'] = { $ne: '' };
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },
    
    findClientsGstDone : function(callback) {
        var search = {};
        search['interviewDate'] = { $ne : '' };
        search['$or'] = [
            { 'husband.rental.gstReturn': true },
            { 'husband.selfEmployed.gstReturn': true },
            { 'wife.rental.gstReturn': true },
            { 'wife.selfEmployed.gstReturn': true }
        ];
        search['gstEfiled'] = { $ne : '' };
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

    findAllClients : async function(preparer) {
        var search = {};
        var method = 'find';
        if (preparer) {
            search = { preparer: preparer };
            method = 'count';
        }
        let err, clients;
        [err, clients] = await to(Client[method](search).lean().exec());
        if (err) return err;
        return clients;
    },

    findAllInterviewedClients: function(callback) {
        var search = {};
        search['interviewDate'] = { $ne: '' };
        Client.find(search).lean().exec(function(err, clients) {
            callback(err, clients);
        });
    },

    updateClient : function(search, values, writeToFile, callback) {
        Client.findOne(search, function(err, oldClient) {
            console.log('updateClient/search: ', search)
            if (oldClient) console.log('updateClient/oldClient: ', oldClient.fileName)
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

                        if (!writeToFile) return callback(save_err, client);

                        Client.findOne(id_search, function(err, client) {
                            WriteExcelService(oldClient, client);
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

    findClientsWithUserNew : async function(user, count) {
        var search = {};
        search['preparer'] = user;
        search['preparerDone'] = '';
        search['readyToPack'] = '';
        search['emailed'] = '';
        var method = 'find';
        if (count) method = 'count';
        let err, clients;
        [err, clients] = await to(Client[method](search).lean().exec());
        if (err) return err;
        return clients;
    },

    findClientsWithUserWIP : async function(user, count) {
        var search = {};
        search['preparer'] = user;
        search['preparerDone'] = 'WIP';
        search['readyToPack'] = '';
        search['emailed'] = '';
        var method = 'find';
        if (count) method = 'count';
        let err, clients;
        [err, clients] = await to(Client[method](search).lean().exec());
        if (err) return err;
        return clients;
    },

    findClientsWithUserOK : async function(user, count) {
        var search = {};
        search['preparer'] = user;
        search['preparerDone'] = 'OK';
        search['readyToPack'] = '';
        search['emailed'] = '';
        var method = 'find';
        if (count) method = 'count';
        let err, clients;
        [err, clients] = await to(Client[method](search).lean().exec());
        if (err) return err;
        return clients;
    },

    findClientsWithUserEmailed : async function(user) {
        var search = {};
        search['preparer'] = user;
        search['preparerDone'] = 'OK';
        search['readyToPack'] = '';
        search['emailed'] = { $ne : '' };
        let err, clients;
        [err, clients] = await to(Client.find(search).lean().exec());
        if (err) return err;
        return clients;
    },

    findClientsPreparerDone : async function(user, count) {
        var search = {};
        search['preparer'] = user;
        search['preparerDone'] = 'OK';
        search['readyToPack'] = { $ne : '' };
        var method = 'find';
        if (count) method = 'count';
        let err, clients;
        [err, clients] = await to(Client[method](search).lean().exec());
        if (err) return err;
        return clients;
    },

    findClientsDone : async function(preparer) {
        var search = {};
        var method = 'find';
        if (preparer) {
            method = 'count';
        }
        search['interviewDate'] = { $ne : '' };
        search['preparer'] = preparer ? preparer : { $ne : '' };
        search['preparerDone'] = 'OK';
        search['pytReceived'] = { $ne : '' };
        search['pytAmount'] = { $ne : '' };
        search['recBy'] = { $ne : '' };
        search['taxToCRA'] = { $ne : '' };
        search['signed'] = { $ne : '' };
        search['packed'] = true;
        let err, clients;
        [err, clients] = await to(Client[method](search).lean().exec());
        if (err) return err;
        return clients;
    },

    addField : function(field, value, callback) {
        if (value == '') console.log('yes')
        Client.find({}).lean().exec(function(err, clients) {
            if (err) callback(err);

            async.each(clients, function(client, done) {
                var fileName = client.fileName;
                var update = {};
                update[field] = value;
                Client.update({ fileName: fileName }, update, function(err, test) {
                    if (err) return done(err);
                    done();
                });
            }, function(err) {
                if (err) callback(err);
                callback();
            });
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
    },

    getTax : function() {
        return Client.schema.path('taxToCRA').enumValues;
    }
};

module.exports = ClientService;