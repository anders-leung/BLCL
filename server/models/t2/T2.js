/**
 * Created by ander on 2017-05-07.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    due: Date, // Monitoring
    client: { // Monitoring
        type: Schema.Types.ObjectId,
        ref: 'Client',
        unique: true,
    },
    received: Date, // Monitoring
    preparer: [{ // Monitoring
        year: Number,
        initials: String,
    }],
    taxOwing: String, // Monitoring
    remarks: {
        monitoring: String,
        preparer: String,
    }, // Monitoring
    completed: Date, // Monitoring sheet show based on completion
    estimated: [{ // Monitoring
        year: Number,
        hours: Number,
    }],
    actual: [{ // Monitoring
        year: Number,
        hours: Number,
    }],
    bank: [{
        name: String,
        accountNumber: String,
    }],
    investments: [String],
    annualReport: String, // Filepath
    directors: [String],
    president: String,
    secretary: String,
    shareholders: [{
        name: String,
        percentage: Number // Or string
    }],
    outstanding: [{ // Monitoring, email on existence
        info: String,
        date: Date,
    }],
    billing: [{
        year: Number,
        amount: String,
    }]
});

module.exports = mongoose.model('T2', ClientSchema);