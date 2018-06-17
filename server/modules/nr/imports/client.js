/**
 * Created by ander on 2017-10-17.
 */

var clientNames = {
    getFileName : function(client) {
        var clientName = '';

        if (client.owner && client.owner.firstName) {
            clientName += client.owner.lastName + ', ' + client.owner.firstName;
            if (client.coOwner && client.coOwner.firstName) {
                clientName += ' and ';
                clientName += client.coOwner.lastName + ', ' + client.coOwner.firstName;
            }
        } else {
            clientName += client.coOwner.lastName + ', ' + client.coOwner.firstName;
        }
        return clientName;
    },

    getPathName : function(client) {
        var clientName = '';

        if (client.owner && client.owner.firstName) {
            clientName += client.owner.lastName.replace(/ /g,'') + '-' +
                client.owner.firstName.replace(/ /g,'');
            if (client.coOwner && client.coOwner.firstName) {
                clientName += '&';
                clientName += client.coOwner.lastName.replace(/ /g,'') + '-' +
                    client.coOwner.firstName.replace(/ /g,'');
            }
        } else {
            clientName += client.coOwner.lastName.replace(/ /g,'') + '-' +
                client.coOwner.firstName.replace(/ /g,'');
        }
        return clientName.toLowerCase();
    }
};

module.exports = clientNames;