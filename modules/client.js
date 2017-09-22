/**
 * Created by ander on 2017-06-02.
 */

var Client = require('../../models/Client');

function getFileName(client) {
    var clientName = '';

    if (client.husband != null) {
        clientName += client.husband.lastName + ', ' + client.husband.firstName;
        if (client.wife != null) {
            clientName += ' AND ';
            clientName += client.wife.lastName + ', ' + client.wife.firstName;
        }
    } else {
        clientName += client.wife.lastName + ', ' + client.wife.firstName;
    }
    return clientName.toLowerCase();
}

function getPathName(client) {
    var clientName = '';

    if (client.husband != null) {
        clientName += client.husband.lastName + '-' + client.husband.firstName;
        if (client.wife != null) {
            clientName += '&';
            clientName += client.wife.lastName + '-' + client.wife.firstName;
        }
    } else {
        clientName += client.wife.lastName + '-' + client.wife.firstName;
    }
    return clientName.toLowerCase();
}

var ClientService = {
    saveClient : function(params, callback) {
        console.log(params);
        var client = new Client(params);
        client.getFileName = getFileName(client);
        client.pathName = getPathName(client);
        client.save(function(err) {
            callback(err);
        });
    },

    findClient : function(params, callback) {
        Client.find(params).lean().exec(function(err, client) {
            if (err) {
                callback(err);
            } else {
                callback(err, client);
            }
        });
    },

    updateClient : function(search, values, callback) {
        Client.update(search, { $set: values }, function(err, client) {
            if (err) {
                callback(err);
            }
        });
    },

    findClients : function(ids, callback) {
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
    }
};

module.exports = ClientService;