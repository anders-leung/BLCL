/**
 * Created by ander on 2017-05-07.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    year: { type: String, default: '' },
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
        number: [{ type: String, default: "" }],
        check: { type: Boolean, default: false }
    },
    email: {
        value: { type: String, default: "" },
        check: { type: Boolean, default: false }
    },
    t1135: {
        type: String,
        enum: [ '', 'N', 'SIMPLE', 'COMPLICATED' ],
        default: ''
    },
    stocks: { type: Boolean, default: false },
    t777: { type: Boolean, default: false },
    slips: { type: Boolean, default: false },
    selfEmployed: { type: Boolean, default: false },
    rental: { type: Boolean, default: false },
    new: { type: Boolean, default: false },
    group: { type: String, default: "" },
    numberOfReturns: { type: String, default: '' },
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
        relationship: {
            type: String,
            enum: ['', 'S', 'D', 'F', 'M', 'GF', 'GM'],
            default: ''
        },
        dateOfBirth: { type: String, default: "" },
        sin: { type: String, default: "" }
    },
    dependent2: {
        name: { type: String, default: "" },
        relationship: {
            type: String,
            enum: ['', 'S', 'D', 'F', 'M', 'GF', 'GM'],
            default: ''
        },
        dateOfBirth: { type: String, default: "" },
        sin: { type: String, default: "" }
    },
    dependent3: {
        name: { type: String, default: "" },
        relationship: {
            type: String,
            enum: ['', 'S', 'D', 'F', 'M', 'GF', 'GM'],
            default: ''
        },
        dateOfBirth: { type: String, default: "" },
        sin: { type: String, default: "" }
    },
    husband: {
        signed: Date,
        t1135: {
            efiled: Date,
            value: {
                type: Number,
                enum: [0, 1, 2],
            },
        },
        citizenship: { type: Boolean, default: false },
        election: { type: Boolean, default: false },
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        dateOfBirth: { type: String, default: "" },
        departure: {
            which: { type: String, enum: ['', 'DEPARTURE', 'LAND', 'DECEASED'], default: '' },
            value: { type: String, default: '' }
        },
        sin: { type: String, default: "" },
        status: { type: String, default: "" },
        noa: { type: Boolean, default: false },
        t4: {
            value: {type: Boolean, default: false },
            blcl: {type: Boolean, default: false }
        },
        t5: {
            value: { type: Boolean, default: false },
            joint: { type: Boolean, default: false },
            blcl: {type: Boolean, default: false }
        },
        otherIncome: {
            value104: { type: String, default: '' },
            value130: { type: String, default: '' }
        },
        t5Other: {
            value: { type: Boolean, default: false },
            joint: { type: Boolean, default: false }
        },
        foreignIncome: {
            div: {
                currency: { type: String, default: '' },
                value: { type: String, default: '' }
            },
            empl: {
                currency: { type: String, default: '' },
                value: { type: String, default: '' }
            },
            country: { type: String, default: "" }
        },
        t3: {
            value: { type: Boolean, default: false },
            joint: { type: Boolean, default: false }
        },
        t5007: { type: Boolean, default: false },
        t4A: {
            value: {type: Boolean, default: false},
            blcl: {type: Boolean, default: false}
        },
        t5008: {
            value: { type: Boolean, default: false },
            joint: { type: Boolean, default: false }
        },
        t4AOAS: { type: Boolean, default: false },
        t5013: {
            value: { type: Boolean, default: false },
            joint: { type: Boolean, default: false }
        },
        t4AP: {
            value: { type: Boolean, default: false },
            split: { type: Boolean, default: false }
        },
        rental: {
            value: { type: String, default: '' },
            joint: { type: String, default: '' },
            gstReturn: { type: Boolean, default: false }
        },
        t4E: { type: Boolean, default: false },
        selfEmployed: {
            value: { type: String, default: '' },
            joint: { type: String, default: '' },
            gstReturn: { type: Boolean, default: false }
        },
        t4RSP: { type: Boolean, default: false },
        supportReceived: { type: String, default: '' },
        uccb: { type: Boolean, default: false },
        rrsp: {
            value: { type: Boolean, default: false },
            spouse: { type: Boolean, default: false }
        },
        value777: { type: Boolean, default: false },
        hbp: { type: Boolean, default: false },
        supportMade: { type: String, default: '' },
        moving: { type: Boolean, default: false },
        unionDue: { type: Boolean, default: false },
        disabilitySupports: { type: Boolean, default: false },
        installment: { type: String, default: '' },
        tuition: { type: Boolean, default: false },
        studentLoan: { type: Boolean, default: false }
    },
    wife: {
        signed: Date,
        t1135: {
            efiled: Date,
            value: {
                type: Number,
                enum: [0, 1, 2],
            },
        },
        citizenship: { type: Boolean, default: false },
        election: { type: Boolean, default: false },
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        dateOfBirth: { type: String, default: "" },
        departure: {
            which: { type: String, enum: ['', 'DEPARTURE', 'LAND', 'DECEASED'], default: '' },
            value: { type: String, default: '' }
        },
        sin: { type: String, default: "" },
        status: { type: String, default: "" },
        noa: { type: Boolean, default: false },
        t4: {
            value: {type: Boolean, default: false },
            blcl: {type: Boolean, default: false }
        },
        t5: {
            value: { type: Boolean, default: false },
            joint: { type: Boolean, default: false },
            blcl: {type: Boolean, default: false }
        },
        otherIncome: {
            value104: { type: String, default: '' },
            value130: { type: String, default: '' }
        },
        t5Other: {
            value: { type: Boolean, default: false },
            joint: { type: Boolean, default: false }
        },
        foreignIncome: {
            div: {
                currency: { type: String, default: '' },
                value: { type: String, default: '' }
            },
            empl: {
                currency: { type: String, default: '' },
                value: { type: String, default: '' }
            },
            country: { type: String, default: "" }
        },
        t3: {
            value: { type: Boolean, default: false },
            joint: { type: Boolean, default: false }
        },
        t5007: { type: Boolean, default: false },
        t4A: {
            value: {type: Boolean, default: false},
            blcl: {type: Boolean, default: false}
        },
        t5008: {
            value: { type: Boolean, default: false },
            joint: { type: Boolean, default: false }
        },
        t4AOAS: { type: Boolean, default: false },
        t5013: {
            value: { type: Boolean, default: false },
            joint: { type: Boolean, default: false }
        },
        t4AP: {
            value: { type: Boolean, default: false },
            split: { type: Boolean, default: false }
        },
        rental: {
            value: { type: String, default: '' },
            joint: { type: String, default: '' },
            gstReturn: { type: Boolean, default: false }
        },
        t4E: { type: Boolean, default: false },
        selfEmployed: {
            value: { type: String, default: '' },
            joint: { type: String, default: '' },
            gstReturn: { type: Boolean, default: false }
        },
        t4RSP: { type: Boolean, default: false },
        supportReceived: { type: String, default: '' },
        uccb: { type: Boolean, default: false },
        rrsp: {
            value: { type: Boolean, default: false },
            spouse: { type: Boolean, default: false }
        },
        value777: { type: Boolean, default: false },
        hbp: { type: Boolean, default: false },
        supportMade: { type: String, default: '' },
        moving: { type: Boolean, default: false },
        unionDue: { type: Boolean, default: false },
        disabilitySupports: { type: Boolean, default: false },
        installment: { type: String, default: '' },
        tuition: { type: Boolean, default: false },
        studentLoan: { type: Boolean, default: false }
    },
    carryingCharges: { type: Boolean, default: false },
    childcare: {
        name: { type: String, default: "" },
        amount: { type: String, default: '' },
        sin: { type: String, default: "" }
    },
    caregiver1: {
        name: { type: String, default: "" },
        amount: { type: String, default: '' }
    },
    caregiver2: {
        name: { type: String, default: "" },
        amount: { type: String, default: '' }
    },
    dependentTuition1: {
        name: { type: String, default: "" },
        amount: { type: String, default: '' }
    },
    dependentTuition2: {
        name: { type: String, default: "" },
        amount: { type: String, default: '' }
    },
    art: { type: Boolean, default: false },
    fitness: { type: Boolean, default: false },
    publicTransit: { type: Boolean, default: false },
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
    dd: { type: Boolean, default: false },
    consultFee: { type: String, default: '' },
    price: { type: String, default: '' },
    fileName: {
        type: String,
        unique: true
    },
    pathName: { type: String, default: "" },
    confirmPickupDate: { type: Boolean, default: false },
    preparerDone: {
        type: String,
        enum: [ '', 'WIP', 'OK' ],
        default: ''
    },
    readyToPack: { type: String, default: '' }, // Ready To PRT/Pack
    signed: { type: String, default: '' },
    pytReceived: {
        type: String,
        enum: [ '', 'ADV', 'CA', 'CHQ', 'DD', 'ET', 'INV' ],
        default: ''
    },
    pytAmount: { type: String, default: '' },
    pytDate: { type: String, default: '' },
    recBy: { type: String, default: '' },
    taxToCRA: { 
        type: String, 
        enum: [ '', 'N/A', 'CLIENT', 'BLCL' ], 
        default: '' 
    },
    t1Efiled: Date,
    gstEfiled: Date,
    outstandingInfo: { type: String, default: "" },
    remarks: { type: String, default: "" },
    callDate: { type: String, default: "" }, // Email/Call Pu
    thingsToDo: { type: String, default: "" },
    emailed: { type: String, default: "" },
    packed: Date,
    teachingSupplies: { type: Boolean, default: false },
    homeAccessibilities: { type: Boolean, default: false },
    t1Remarks: String,
    gstRemarks: String,
    preparerRemarks: String,
    oldPreparer: String,
    gstSigned: Date,
});

ClientSchema.virtual('name').get(function () {
    let name = '';
    const husband = this.husband;
    const wife = this.wife;
    if (husband.lastName) {
        name += `${husband.lastName}, ${husband.firstName}`;
    }
    if (wife.lastName) {
        const wifeName = `${wife.lastName}, ${wife.firstName}`;
        if (name) name += ` and ${wifeName}`;
        else name += wifeName;
    }
    return name;
});

ClientSchema.set('toObject', { virtuals: true });
ClientSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('T1', ClientSchema);