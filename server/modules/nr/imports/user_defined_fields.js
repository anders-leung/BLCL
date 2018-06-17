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
        client.services = value.split(', ').map(x => { return { service: x } });
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
    '21': fn('bankInfo'),
    '22': fn('name'),
    '23': fn('address'),
    '24': fn('number'),
    '25': fn('tel'),
    '26': fn('fax'),
    '27': fn('cell'),
    '28': fn('pager'),
    '29': fn('email'),
    '65': fn('rental.contact'),
    '67': fn('rental.mortgage.contact'),
    '68': fn('rental.mortgage.bank'),
    '69': fn('rental.mortgage.number'),
    '70': fn('rental.bank.tel'),
    '71': fn('rental.bank.fax'),
    '72': fn('rental.bank.contact'),
    '76': fn('cc.usage'),
    '77': fn('cc.completionDates[0]'),
    '78': fn('cc.completionDates[1]'),
    '79': fn('cc.lawFirm.name'),
    '80': fn('cc.lawFirm.address'),
    '81': fn('cc.conveyancer'),
    '82': fn('cc.lawFirm.tel'),
    '83': fn('cc.lawFirm.fax'),
    '84': fn('cc.lawFirm.email')
}