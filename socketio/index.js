/**
 * Created by ander on 2017-09-15.
 */
var getFileName = require('./utils/get_file_name');
var ClientService = require('../modules/client');

var m_names = ["JAN", "FEB", "MAR",
    "APR", "MAY", "JUN", "JUL", "AUG", "SEP",
    "OCT", "NOV", "DEC"];

function getDate() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear() - 2000;
    return curr_date + "-" + m_names[curr_month] + "-" + curr_year;
}

var IndexSockets = {
    monitorUpdate: function(socket) {
        socket.on('monitoring sheet update', function (data) {
            socket.broadcast.emit('monitoring sheet update', data);
            console.log(data);
            var search = {};
            search['fileName'] = data.fileName;
            var update = {};
            update[data.field] = data.value;

            if (data.column == 29) {
                update['pytDate'] = getDate();
            }

            ClientService.updateClient(search, update, function(err, client) {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
};

module.exports = IndexSockets;