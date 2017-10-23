/**
 * Created by ander on 2017-05-07.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    year: { type: Number, default: 0 },
    interviewer: { type: String, default: "" },
    prSold: { type: Boolean, default: false },
    pickupDate: { type: String, default: "" },
    preparer: { type: String, default: "" },
    checker: { type: String, default: "" },
    interviewDate: { type: String, default: "" },
    tel: {
        number: { type: String, default: "" },
        check: { type: Boolean, default: false }
    },
    cell: {
        number: { type: String, default: "" },
        check: { type: Boolean, default: false }
    },
    email: {
        value: { type: String, default: "" },
        check: { type: Boolean, default: false }
    },
    t1135: {
        type: String,
        enum: [ '', 'SIMPLE', 'COMPLICATED' ],
        default: ''
    },
    stocks: { type: Boolean, default: false },
    t777: { type: Boolean, default: false },
    slips: { type: Boolean, default: false },
    selfEmployed: { type: Boolean, default: false },
    rental: { type: Boolean, default: false },
    new: { type: Boolean, default: false },
    group: { type: String, default: "" },
    numberOfReturns: { type: Number, default: 0 },
    method: {
        type: String,
        enum: [ '', 'DROP', 'EMAIL' ],
        default: ''
    },
    address: {
        apartment: { type: String, default: "" },
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        province: { type: String, default: "" },
        postalCode: { type: String, default: "" },
        check: { type: Boolean, default: false }
    },
    dependent1: {
        name: { type: String, default: "" },
        relationship: { type: String, default: "" },
        dateOfBirth: { type: String, default: "" },
        sin: { type: String, default: "" }
    },
    dependent2: {
        name: { type: String, default: "" },
        relationship: { type: String, default: "" },
        dateOfBirth: { type: String, default: "" },
        sin: { type: String, default: "" }
    },
    dependent3: {
        name: { type: String, default: "" },
        relationship: { type: String, default: "" },
        dateOfBirth: { type: String, default: "" },
        sin: { type: String, default: "" }
    },
    husband: {
        citizenship: { type: Boolean, default: false },
        election: { type: Boolean, default: false },
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        dateOfBirth: { type: String, default: "" },
        departure: { type: String, default: "" },
        sin: { type: String, default: "" },
        status: { type: String, default: "" },
        noa: { type: Boolean, default: false },
        t4: { type: Number, default: 0 },
        t5: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 }
        },
        otherIncome: {
            value104: { type: Number, default: 0 },
            value130: { type: Number, default: 0 }
        },
        t5Other: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 }
        },
        foreignIncome: {
            div: {
                currency: { type: String, default: '' },
                value: { type: Number, default: 0 }
            },
            empl: {
                currency: { type: String, default: '' },
                value: { type: Number, default: 0 }
            },
            country: { type: String, default: "" }
        },
        t3: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 }
        },
        t5007: { type: Number, default: 0 },
        t4A: { type: Number, default: 0 },
        t5008: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 }
        },
        t4AOAS: { type: Number, default: 0 },
        t5013: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 }
        },
        t4AP: {
            value: { type: Number, default: 0 },
            split: { type: Boolean, default: false }
        },
        rental: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 },
            gstReturn: { type: Boolean, default: false }
        },
        t4E: { type: Number, default: 0 },
        selfEmployed: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 },
            gstReturn: { type: Boolean, default: false }
        },
        t4RSP: { type: Number, default: 0 },
        supportReceived: { type: Number, default: 0 },
        uccb: { type: Boolean, default: false },
        rrsp: {
            value: { type: Number, default: 0 },
            spouse: { type: Number, default: 0 }
        },
        value777: { type: Number, default: 0 },
        hbp: { type: Number, default: 0 },
        supportMade: { type: Number, default: 0 },
        moving: { type: Boolean, default: false },
        unionDue: { type: Boolean, default: false },
        disabilitySupports: { type: Boolean, default: false },
        installation: { type: Number, default: 0 },
        tuition: { type: Boolean, default: false },
        studentLoan: { type: Boolean, default: false }
    },
    wife: {

        citizenship: { type: Boolean, default: false },
        election: { type: Boolean, default: false },
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        dateOfBirth: { type: String, default: "" },
        departure: { type: String, default: "" },
        sin: { type: String, default: "" },
        status: { type: String, default: "" },
        noa: { type: Boolean, default: false },
        t4: { type: Number, default: 0 },
        t5: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 }
        },
        otherIncome: {
            value104: { type: Number, default: 0 },
            value130: { type: Number, default: 0 }
        },
        t5Other: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 }
        },
        foreignIncome: {
            div: {
                currency: { type: String, default: '' },
                value: { type: Number, default: 0 }
            },
            empl: {
                currency: { type: String, default: '' },
                value: { type: Number, default: 0 }
            },
            country: { type: String, default: "" }
        },
        t3: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 }
        },
        t5007: { type: Number, default: 0 },
        t4A: { type: Number, default: 0 },
        t5008: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 }
        },
        t4AOAS: { type: Number, default: 0 },
        t5013: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 }
        },
        t4AP: {
            value: { type: Number, default: 0 },
            split: { type: Boolean, default: false }
        },
        rental: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 },
            gstReturn: { type: Boolean, default: false }
        },
        t4E: { type: Number, default: 0 },
        selfEmployed: {
            value: { type: Number, default: 0 },
            joint: { type: Number, default: 0 },
            gstReturn: { type: Boolean, default: false }
        },
        t4RSP: { type: Number, default: 0 },
        supportReceived: { type: Number, default: 0 },
        uccb: { type: Boolean, default: false },
        rrsp: {
            value: { type: Number, default: 0 },
            spouse: { type: Number, default: 0 }
        },
        value777: { type: Boolean, default: false },
        hbp: { type: Number, default: 0 },
        supportMade: { type: Number, default: 0 },
        moving: { type: Boolean, default: false },
        unionDue: { type: Boolean, default: false },
        disabilitySupports: { type: Boolean, default: false },
        installation: { type: Number, default: 0 },
        tuition: { type: Boolean, default: false },
        studentLoan: { type: Boolean, default: false }
    },
    carryingCharges: { type: Boolean, default: false },
    childcare: {
        name: { type: String, default: "" },
        amount: { type: Number, default: 0 },
        sin: { type: String, default: "" }
    },
    caregiver1: {
        name: { type: String, default: "" },
        amount: { type: Number, default: 0 }
    },
    caregiver2: {
        name: { type: String, default: "" },
        amount: { type: Number, default: 0 }
    },
    dependentTuition1: {
        name: { type: String, default: "" },
        amount: { type: Number, default: 0 }
    },
    dependentTuition2: {
        name: { type: String, default: "" },
        amount: { type: Number, default: 0 }
    },
    /*
    art: {
        amount: { type: Number, default: 0 },
        check: { type: Boolean, default: false }
    },
    fitness: {
        amount: { type: Number, default: 0 },
        check: { type: Boolean, default: false }
    },
    publicTransit: { type: Boolean, default: false },
    */
    donation: { type: Boolean, default: false },
    medExp: { type: Boolean, default: false },
    hbtc: { type: Boolean, default: false },
    disability: { type: Boolean, default: false },
    t2201: { type: Boolean, default: false },
    equiv: { type: Boolean, default: false },
    notes: {
        one: { type: String, default: "" },
        two: { type: String, default: "" },
        three: { type: String, default: "" }
    },
    comments: {
        one: { type: String, default: "" },
        two: { type: String, default: "" },
        three: { type: String, default: "" }
    },
    witb: { type: Boolean, default: false },
    ctb: { type: Boolean, default: false },
    gst: { type: Boolean, default: false },
    prov: { type: Boolean, default: false },
    msp: { type: Boolean, default: false },
    consultFee: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    fileName: {
        type: String,
        unique: true
    },
    pathName: { type: String, default: "" },
    pickedUp: { type: Boolean, default: false },
    preparerDone: {
        type: String,
        enum: [ '', 'WIP', 'OK' ],
        default: ''
    },
    checkerDone: { type: Boolean, default: false },
    readyForPickup: { type: Boolean, default: false },
    pickupOk: { type: Boolean, default: false },
    pytReceived: {
        type: String,
        enum: [ '', 'CA', 'CK', 'DD', 'ETR' ],
        default: ''
    },
    outstandingInfo: { type: String, default: "" },
    remarks: { type: String, default: "" },
    callDate: { type: String, default: "" },
    thingsToDo: { type: String, default: "" },
    emailed: { type: String, default: "" },
    packed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Client', ClientSchema);