/**
 * Created by ander on 2017-09-21.
 */
var ClientService = require('../../modules/client');
var User = require('../../models/User');

module.exports = function() {

/*    ClientService.saveClient({
        year: 2016,
        interviewer: "A",
        prSold: true,
        pickupDate: "2017-01-01",
        preparer: "B",
        checker: "C",
        interviewDate: "2017-01-02",
        tel: {
            number: "604-448-0982",
            check: true
        },
        cell: {
            number: "778-867-0616",
            check: true
        },
        email: {
            value: "anders_leung@hotmail.com",
            check: true
        },
        t1135: 'SIMPLE',
        stocks: true,
        t777: true,
        slips: true,
        selfEmployed: true,
        rental: true,
        new: true,
        group: "D",
        numberOfReturns: 1,
        method: 'DROP',
        address: {
            apartment: "1505",
            street: "57 St. Joseph Street",
            city: "Toronto",
            province: "ON",
            country: "Canada",
            postalCode: "M5S 05C",
            check: true
        },
        dependent1: {
            name: "Anders",
            relationship: "S",
            dateOfBirth: "1995-06-16",
            sin: "111-111-111"
        },
        dependent2: {
            name: "Anthony",
            relationship: "D",
            dateOfBirth: "1990-12-27",
            sin: "222-222-222"
        },
        dependent3: {
            name: "Robert",
            relationship: "GM",
            dateOfBirth: "1995-08-20",
            sin: "333-333-333"
        },
        husband: {
            citizenship: true,
            election: true,
            firstName: "Alex",
            lastName: "Yeung",
            dateOfBirth: "2017-01-03",
            departure: "Departure 1",
            sin: "444-444-444",
            status: "Status 1",
            noa: true,
            t4: 2,
            t5: {
                value: 3,
                joint: 4
            },
            otherIncome: {
                value104: 5,
                value130: 6
            },
            t5Other: {
                value: 7,
                joint: 8
            },
            foreignIncome: {
                div: 9,
                empl: 10,
                country: "Country 1"
            },
            t3: {
                value: 11,
                joint: 12
            },
            t5007: 13,
            t4A: 14,
            t5008: {
                value: 15,
                joint: 16
            },
            t4AOAS: 17,
            t5013: {
                value: 18,
                joint: 19
            },
            t4AP: {
                value: 20,
                split: true
            },
            rental: {
                value: 21,
                joint: 22,
                gstReturn: true
            },
            t4E: 23,
            selfEmployed: {
                value: 24,
                joint: 25,
                gstReturn: true
            },
            t4RSP: 26,
            supportReceived: 27,
            uccb: true,
            rrsp: {
                value: 28,
                spouse: 29
            },
            value777: 30,
            hbp: 31,
            supportMade: 32,
            moving: true,
            unionDue: true,
            disabilitySupports: true,
            installation: 33,
            tuition: true,
            studentLoan: true
        },
        wife: {
            citizenship: true,
            election: true,
            firstName: "Dert",
            lastName: "Ders",
            dateOfBirth: "2017-01-04",
            departure: "Departure 2",
            sin: "555-555-555",
            status: "Status 2",
            noa: true,
            t4: 34,
            t5: {
                value: 35,
                joint: 36
            },
            otherIncome: {
                value104: 37,
                value130: 38
            },
            t5Other: {
                value: 39,
                joint: 40
            },
            foreignIncome: {
                div: 41,
                empl: 42,
                country: "Country 2"
            },
            t3: {
                value: 43,
                joint: 44
            },
            t5007: 45,
            t4A: 46,
            t5008: {
                value: 47,
                joint: 48
            },
            t4AOAS: 49,
            t5013: {
                value: 50,
                joint: 51
            },
            t4AP: {
                value: 52,
                split: true
            },
            rental: {
                value: 53,
                joint: 54,
                gstReturn: true
            },
            t4E: 55,
            selfEmployed: {
                value: 56,
                joint: 57,
                gstReturn: true
            },
            t4RSP: 58,
            supportReceived: 59,
            uccb: true,
            rrsp: {
                value: 60,
                spouse: 61
            },
            value777: 62,
            hbp: 63,
            supportMade: 64,
            moving: true,
            unionDue: true,
            disabilitySupports: true,
            installation: 65,
            tuition: true,
            studentLoan: true
        },
        carryingCharges: 66,
        childcare: {
            name: "Care 1",
            amount: 67,
            sin: "666-666-666"
        },
        caregiver1: {
            name: "Give 1",
            amount: 68
        },
        caregiver2: {
            name: "Give 2",
            amount: 69
        },
        dependentTuition1: {
            name: "Tuition 1",
            amount: 70
        },
        dependentTuition2: {
            name: "Tuition 2",
            amount: 71
        },
        art: {
            amount: 72,
            check: true
        },
        fitness: {
            amount: 73,
            check: true
        },
        publicTransit: true,
        donation: true,
        medExp: true,
        hbtc: true,
        disability: true,
        t2201: true,
        equiv: true,
        notes: {
            one: "Note 1",
            two: "Note 2",
            three: "Note 3"
        },
        comments: {
            one: "Comment 1",
            two: "Comment 2",
            three: "Comment 3"
        },
        witb: true,
        ctb: true,
        gst: true,
        prov: true,
        msp: true,
        consultFee: 74,
        price: 75,
        pickedUp: false,
        preparerDone: "",
        checkerDone: false,
        readyForPickup: false,
        pickupOk: false,
        outstandingInfo: "Outstanding Info",
        remarks: "Remark",
        callDate: "2017-01-05",
        thingsToDo: "Nothing",
        emailed: '',
        packed: false
    }, function(err) {
        if (err) {
            console.log(err);
        }
    });
*/
    var admin = new User();
    admin.email = 'georgia@ben-cpa.com';
    admin.password = 'adminPassword';
    admin.role = 'Administrator';
    admin.initials = 'GK';
    admin.save();

    var user = new User();
    user.email = 'test-email@gmail.com';
    user.password = 'test';
    user.role = 'Employee';
    user.initials = 'TE';
    user.save();

    var user = new User();
    user.email = 'amy@ben-cpa.com';
    user.password = 'amy';
    user.role = 'Employee';
    user.initials = 'AMY';
    user.save();
};