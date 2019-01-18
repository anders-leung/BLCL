/**
 * Created by ander on 2019-01-13.
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
    preparer: [{ // Monitoring
        year: Number,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
    }],
    taxOwing: String, // Monitoring
    remarks: {
        monitoring: String,
        preparer: String,
    }, // Monitoring
    completed: Date, // Monitoring sheet show based on completion
    hours: [{
        year: Number,
        estimated: Number,
        actual: Number,
        variance: Number,
    }],
    banks: [{
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
        percent: Number // Or string
    }],
    outstanding: [{ // Monitoring, email on existence
        info: String,
        date: Date,
    }],
    job: {
        in: Date,
        start: Date,
        finish: Date,
    },
    fileClosed: Boolean,
});

module.exports = mongoose.model('T2', ClientSchema);