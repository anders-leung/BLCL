let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let service = {
    cra: String,
    invoice: {
        date: String,
        number: String
    },
    payment: {
        type: String,
        amount: String
    },
    applyTin: Boolean,
    applyAgentNumber: Boolean,
    agentSigned: String
}

let NR4Schema = new Schema(service);

service.signed = String;

let NR6Schema = new Schema(service);

delete service.agentSigned;

let S216Schema = new Schema(service);
let S116Schema = new Schema(service);

service.completionDate = String;
service.finalOffer = String;

let CCSchema = new Schema(service);

module.exports = {
    NR6: mongoose.model('NR6', NR6Schema),
    NR4: mongoose.model('NR4', NR4Schema),
    S216: mongoose.model('S216', S216Schema),
    CC: mongoose.model('CC', CCSchema),
    S116: mongoose.model('S116', S116Schema)
}