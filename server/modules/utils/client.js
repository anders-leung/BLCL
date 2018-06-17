/**
 * Created by ander on 2017-10-17.
 */

var clientNames = {
    getFileName : function(client) {
        var clientName = '';

        if (client.husband && client.husband.firstName) {
            clientName += client.husband.lastName + ', ' + client.husband.firstName;
            if (client.wife && client.wife.firstName) {
                clientName += ' and ';
                clientName += client.wife.lastName + ', ' + client.wife.firstName;
            }
        } else {
            clientName += client.wife.lastName + ', ' + client.wife.firstName;
        }
        return clientName;
    },

    getPathName : function(client) {
        var clientName = '';

        if (client.husband && client.husband.firstName) {
            clientName += client.husband.lastName.replace(/ /g,'') + '-' +
                client.husband.firstName.replace(/ /g,'');
            if (client.wife && client.wife.firstName) {
                clientName += '&';
                clientName += client.wife.lastName.replace(/ /g,'') + '-' +
                    client.wife.firstName.replace(/ /g,'');
            }
        } else {
            clientName += client.wife.lastName.replace(/ /g,'') + '-' +
                client.wife.firstName.replace(/ /g,'');
        }
        return clientName.toLowerCase();
    }
};

module.exports = clientNames;