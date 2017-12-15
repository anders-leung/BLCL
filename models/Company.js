/**
 * Created by ander on 2017-12-03.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    t2: {
        jobIn: {type: String, default: ''},
        jobPickup: {type: String, default: ''},
        paTimeAllot: {type: String, default: ''},
        paTimeActual: {type: String, default: ''},
        paTimeVariance: {type: String, default: ''},
        fileName: {type: String, default: ''},
        pathName: {type: String, default: ''},
        name: {type: String, default: ''},
        yearEnded: {type: String, default: ''},
        dueDate: {type: String, default: ''},
        reason: {type: String, default: ''},
        status: {type: String, default: ''}
    },
    t4: {
        done : { type : String, default : '', enum : ['', 'WIP', 'OK']},
        billed : {
            value : { type : Boolean, default : false },
            invoicing : { type : String, default : 'SEPARATE', enum : ['SEPARATE', 'T2']}
        },
        t1 : { type : Boolean, default : false }
    },
    t5: {
        done : { type : String, default : '', enum : ['', 'WIP', 'OK']},
        billed : {
            value : { type : Boolean, default : false },
            invoicing : { type : String, default : 'SEPARATE', enum : ['SEPARATE', 'T2']}
        },
        t1 : { type : Boolean, default : false }
    }
});

module.exports = mongoose.model('Company', CompanySchema);