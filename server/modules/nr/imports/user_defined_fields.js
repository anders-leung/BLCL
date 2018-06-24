function fn(field) {
    return new Function('value', 'client', 'client.' + field + ' = value;');
}

module.exports = {
    '1': fn('owner.title'),
    '2': function(value, client) {
        let tokens = value.split(', ');
        client.owner.lastName = tokens[0];
        client.owner.firstName = tokens[1];
    },
    '4': fn('remarks'),
    '6': fn('startYear'),
    '7': function(value, client) {
        for (let service of value.split(', ')) {
            if (service == 'NR6') client.nr6 = {};
            if (service == 'NR4') client.nr4 = {};
            if (service == 'S216') client.s216 = {};
            if (service == 'CC') client.cc = {};
            if (service == 'S116') client.s116 = {};
        }
    },
    '8': fn('status'),
    '9': fn('owner.sin'),
    '10': fn('coOwner.title'),
    '11': fn('coOwner.firstName'),
    '12': fn('coOwner.lastName'),
    '13': fn('coOwner.sin'),
    '14': fn('purchaser'),
    '15': fn('properties[0]'),
    '16': fn('properties[1]'),
    '17': fn('properties[2]'),
    '18': fn('properties[3]'),
    '19': fn('properties[4]'),
    '20': fn('properties[5]'),
    '22': function(value, client) {
        client.agent = { name: value }
    },
    '23': fn('agent.address'),
    '24': fn('agent.number'),
    '25': fn('agent.tel'),
    '26': fn('agent.fax'),
    '27': fn('agent.cell'),
    '28': fn('agent.pager'),
    '29': fn('agent.email'),
    '77': function(value, client) {
        if (!client.cc) client.cc = {};
        client.cc.completionDate = value;
    },
    '79': function(value, client) {
        client.lawyer = { name: value }
    },
    '80': function (value, client) {
        client.lawyer.address = { street: value };
    },
    '82': fn('lawyer.tel'),
    '83': fn('lawyer.fax'),
    '84': fn('lawyer.email')
}