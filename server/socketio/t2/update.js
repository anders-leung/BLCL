const to = require('../../helpers/to');
const T2Service = require('../../modules/t2/client');
const UserService = require('../../modules/user');

const year = (new Date()).getFullYear() - 1;

module.exports = {
    update: async (socket, data) => {
        let err, user, t2;
        const { id, field, value } = data;

        if (field === 'preparer') {
            UserService.findOneUser({ initials: value }, async (err, user) => {
                if (err) return console.log('socket t2 update find user err: ', err);

                [err, t2] = await T2Service.get({ _id: id});
                if (err) return console.log('socket t2 update get t2 err: ', err);

                let index = -1;
                t2 = t2[0];
                t2.preparer.forEach((preparer, i) => {
                    if (preparer.year === year) index = i;
                });

                if (index > -1) {
                    t2.preparer[index].user = user._id;
                } else {
                    t2.preparer.push({ year, user: user._id });
                }
                
                [err, t2] = await to(t2.save());
                socket.broadcast.emit('update t2', data);
            });
        } else {
            const query = { _id: id };
            const update = { [field]: value };
            if (user) update[field] = user._id;
    
            [err, t2] = await T2Service.update(query, update);
            if (err) return console.log('socket t2 update err: ', err);
    
            socket.broadcast.emit('update t2', data);
        }
    }
}