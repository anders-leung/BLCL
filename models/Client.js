/**
 * Created by ander on 2017-05-07.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    year: Number,
    interviewer: String,
    prSold: Boolean,
    pickupDate: String,
    preparer: String,
    checker: String,
    interviewDate: String,
    tel: {
        number: String,
        check: Boolean
    },
    cell: {
        number: String,
        check: Boolean
    },
    email: {
        value: String,
        check: Boolean
    },
    t1135: {
        type: String,
        enum: ['Simple', 'Complicated']
    },
    stocks: Boolean,
    t777: Boolean,
    slips: Boolean,
    selfEmployed: Boolean,
    rental: Boolean,
    new: Boolean,
    group: String,
    numberOfReturns: Number,
    method: {
        type: String,
        enum: ['Drop', 'Email']
    },
    address: {
        apartment: String,
        street: String,
        city: String,
        province: String,
        country: String,
        postalCode: String,
        check: Boolean
    },
    dependent1: {
        name: String,
        relationship: String,
        dateOfBirth: String,
        sin: String
    },
    dependent2: {
        name: String,
        relationship: String,
        dateOfBirth: String,
        sin: String
    },
    dependent3: {
        name: String,
        relationship: String,
        dateOfBirth: String,
        sin: String
    },
    husband: {
        citizenship: Boolean,
        election: Boolean,
        firstName: String,
        lastName: String,
        dateOfBirth: String,
        departure: String,
        sin: String,
        status: String,
        noa: Boolean,
        t4: Number,
        t5: {
            value: Number,
            joint: Number
        },
        otherIncome: {
            value104: Number,
            value130: Number
        },
        t5Other: {
            value: Number,
            joint: Number
        },
        foreignIncome: {
            div: Number,
            empl: Number,
            country: String
        },
        t3: {
            value: Number,
            joint: Number
        },
        t5007: Number,
        t4A: Number,
        t5008: {
            value: Number,
            joint: Number
        },
        t4AOAS: Number,
        t5013: {
            value: Number,
            joint: Number
        },
        t4AP: {
            value: Number,
            split: Boolean
        },
        rental: {
            value: Number,
            joint: Number,
            gstReturn: Boolean
        },
        t4E: Number,
        selfEmployed: {
            value: Number,
            joint: Number,
            gstReturn: Boolean
        },
        t4RSP: Number,
        supportReceived: Number,
        uccb: Boolean,
        rrsp: {
            value: Number,
            spouse: Number
        },
        value777: Number,
        hbp: Number,
        supportMade: Number,
        moving: Boolean,
        unionDue: Boolean,
        disabilitySupports: Boolean,
        installation: Number,
        tuition: Boolean,
        studentLoan: Boolean
    },
    wife: {

        citizenship: Boolean,
        election: Boolean,
        firstName: String,
        lastName: String,
        dateOfBirth: String,
        departure: String,
        sin: String,
        status: String,
        noa: Boolean,
        t4: Number,
        t5: {
            value: Number,
            joint: Number
        },
        otherIncome: {
            value104: Number,
            value130: Number
        },
        t5Other: {
            value: Number,
            joint: Number
        },
        foreignIncome: {
            div: Number,
            empl: Number,
            country: String
        },
        t3: {
            value: Number,
            joint: Number
        },
        t5007: Number,
        t4A: Number,
        t5008: {
            value: Number,
            joint: Number
        },
        t4AOAS: Number,
        t5013: {
            value: Number,
            joint: Number
        },
        t4AP: {
            value: Number,
            split: Boolean
        },
        rental: {
            value: Number,
            joint: Number,
            gstReturn: Boolean
        },
        t4E: Number,
        selfEmployed: {
            value: Number,
            joint: Number,
            gstReturn: Boolean
        },
        t4RSP: Number,
        supportReceived: Number,
        uccb: Boolean,
        rrsp: {
            value: Number,
            spouse: Number
        },
        value777: Number,
        hbp: Number,
        supportMade: Number,
        moving: Boolean,
        unionDue: Boolean,
        disabilitySupports: Boolean,
        installation: Number,
        tuition: Boolean,
        studentLoan: Boolean
    },
    carryingCharges: Number,
    childcare: {
        name: String,
        amount: Number,
        sin: String
    },
    caregiver1: {
        name: String,
        amount: Number
    },
    caregiver2: {
        name: String,
        amount: Number
    },
    dependentTuition1: {
        name: String,
        amount: Number
    },
    dependentTuition2: {
        name: String,
        amount: Number
    },
    art: {
        amount: Number,
        check: Boolean
    },
    fitness: {
        amount: Number,
        check: Boolean
    },
    publicTransit: Boolean,
    donation: Boolean,
    medExp: Boolean,
    hbtc: Boolean,
    disability: Boolean,
    t2201: Boolean,
    equiv: Boolean,
    notes: {
        one: String,
        two: String,
        three: String
    },
    comments: {
        one: String,
        two: String,
        three: String
    },
    witb: Boolean,
    ctb: Boolean,
    gst: Boolean,
    prov: Boolean,
    msp: Boolean,
    consultFee: Number,
    price: Number,
    fileName: {
        type: String,
        unique: true
    },
    pathName: String,
    pickedUp: false,
    preparerDone: {
        type: String,
        enum: [ '', 'WIP', 'OK' ]
    },
    checkerDone: false,
    readyForPickup: false,
    pickupOk: false,
    pytReceived: false,
    outstandingInfo: String,
    remarks: String,
    callDate: String,
    thingsToDo: String
});

module.exports = mongoose.model('Client', ClientSchema);