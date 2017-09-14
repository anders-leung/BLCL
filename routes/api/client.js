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
        })
    },

    updateClient : function(search, values, callback) {
        Client.update(search, { $set: values }, callback);
    }
};

module.exports = ClientService;