/**
 * Created by ander on 2017-10-17.
 */

var clientNames = {
    getFileName : function(client) {
        var clientName = '';

        if (client.husband.firstName) {
            clientName += client.husband.lastName + ', ' + client.husband.firstName;
            if (client.wife.firstName) {
                clientName += ' and ';
                clientName += client.wife.lastName + ', ' + client.wife.firstName;
            } else {
                client.wife = null;
            }
        } else {
            clientName += client.wife.lastName + ', ' + client.wife.firstName;
            client.husband = null;
        }
        return clientName;
    },

    getPathName : function(client) {
        var clientName = '';

        if (client.husband.firstName) {
            clientName += client.husband.lastName.replace(/ /g,'') + '-' +
                client.husband.firstName.replace(/ /g,'');
            if (client.wife.firstName) {
                clientName += '&';
                clientName += client.wife.lastName.replace(/ /g,'') + '-' +
                    client.wife.firstName.replace(/ /g,'');
            } else {
                client.wife = null;
            }
        } else {
            clientName += client.wife.lastName.replace(/ /g,'') + '-' +
                client.wife.firstName.replace(/ /g,'');
            client.husband = null;
        }
        return clientName.toLowerCase();
    }
};

module.exports = clientNames;