/**
 * Created by ander on 2017-05-10.
 */
$(document).ready(function(e) {
    // Setup the year
    var year = (new Date()).getYear();
    year = year + 1899;
    $('#year').val(year);

    // Phone formatting
    $('.phone').on('keyup', function(e) {
        var key = e.keyCode || e.charCode;
        if (key == 8 || key == 46) {
            return false;
        }
        var number = $(this);
        var value = number.val();

        if (e.charCode < 48 && e.charCode > 57) {
            console.log(e);
        }

        if (value.length == 3) {
            number.val(value + '-');
        } else if(value.length == 7) {
            number.val(value + '-');
        }
        if (value.length > 12) {
            number.val(value.substring(0, value.length - 1));
        }
    });

    // Sin formatting
    $('.sin').on('keyup', function(e) {
        var key = e.keyCode || e.charCode;
        if (key == 8 || key == 46) {
            return false;
        }
        var sin = $(this);
        var value = sin.val();
        if (value.length > 11) {
            sin.val(value.substring(0, value.length - 1));
        }
        if (value.length == 3 || value.length == 7) {
            sin.val(value + '-');
        }
    });

    if (client != null) {
        $('#year').val(client.year);
        $('#interviewer').val(client.interviewer);
        $('#preparer').val(client.preparer);
        $('#checker').val(client.checker);
        $('#pickupDate').val(client.pickupDate);
        $('#interviewDate').val(client.interviewDate);
        $('#returns').val(client.numberOfReturns);
        $('#method').val(client.method);
        $('#t1135').val(client.t1135);
        $('#group').val(client.group);
        $('#prSold').prop('checked', client.prSold);
        $('#slips').prop('checked', client.slips);
        $('#stocks').prop('checked', client.stocks);
        $('#t777').prop('checked', client.t777);
        $('#new').prop('checked', client.new);
        $('#selfEmployed').prop('checked', client.selfEmployed);
        $('#rental').prop('checked', client.rental);
        $('#tel').val(client.tel.number);
        $('#cell').val(client.cell.number);
        $('#email').val(client.email.value);
        $('#apartment').val(client.address.apartment);
        $('#street').val(client.address.street);
        $('#city').val(client.address.city);
        $('#province').val(client.address.province);
        $('#postalCode').val(client.address.postalCode);
        $('#country').val(client.address.country);

        $('#husbandFirstName').val(client.husband.firstName);
        $('#husbandLastName').val(client.husband.lastName);
        $('#husbandDob').val(client.husband.dateOfBirth);
        $('#husbandDeparture').val(client.husband.departure);
        $('#husbandSin').val(client.husband.sin);
        $('#husbandCitizenship').prop('checked', client.husband.citizenship);
        $('#husbandElection').prop('checked', client.husband.election);
        $('#husbandNoa').prop('checked', client.husband.noa);

        $('#wifeFirstName').val(client.wife.firstName);
        $('#wifeLastName').val(client.wife.lastName);
        $('#wifeDob').val(client.wife.dateOfBirth);
        $('#wifeDeparture').val(client.wife.departure);
        $('#wifeSin').val(client.wife.sin);
        $('#wifeCitizenship').prop('checked', client.wife.citizenship);
        $('#wifeElection').prop('checked', client.wife.election);
        $('#wifeNoa').prop('checked', client.wife.noa);

        $('#dependent1').val(client.dependent1.name);
        $('#relationship1').val(client.dependent1.relationship);
        $('#dob1').val(client.dependent1.dateOfBirth);
        $('#sin1').val(client.dependent1.sin);

        $('#dependent2').val(client.dependent2.name);
        $('#relationship2').val(client.dependent2.relationship);
        $('#dob2').val(client.dependent2.dateOfBirth);
        $('#sin2').val(client.dependent2.sin);

        $('#dependent3').val(client.dependent3.name);
        $('#relationship3').val(client.dependent3.relationship);
        $('#dob3').val(client.dependent3.dateOfBirth);
        $('#sin3').val(client.dependent3.sin);

        $('#husbandT4').val(client.husband.t4);
        $('#husbandT5').val(client.husband.t5.value);
        $('#husbandT5Joint').val(client.husband.t5.joint);
        $('#husband104').val(client.husband.otherIncome.value104);
        $('#husband130').val(client.husband.otherIncome.value130);
        $('#husbandT5Other').val(client.husband.t5Other.value);
        $('#husbandT5OtherJoint').val(client.husband.t5Other.joint);
        $('#husbandDivCurrency').val(client.husband.foreignIncome.div.currency);
        $('#husbandDiv').val(client.husband.foreignIncome.div.value);
        $('#husbandEmplCurrency').val(client.husband.foreignIncome.empl.currency);
        $('#husbandEmpl').val(client.husband.foreignIncome.empl.value);
        $('#husbandCountry').val(client.husband.foreignIncome.country);
        $('#husbandT3').val(client.husband.t3.value);
        $('#husbandT3Joint').val(client.husband.t3.joint);
        $('#husbandT5007').val(client.husband.t5007);
        $('#husbandT4A').val(client.husband.t4A);
        $('#husbandT5008').val(client.husband.t5008.value);
        $('#husbandT5008Joint').val(client.husband.t5008.joint);
        $('#husbandT4AOAS').val(client.husband.t4AOAS);
        $('#husbandT5013').val(client.husband.t5013.value);
        $('#husbandT5013Joint').val(client.husband.t5013.joint);
        $('#husbandT4AP').val(client.husband.t4AP.value);
        $('#husbandSplit').prop('checked', client.husband.t4AP.split);
        $('#husbandRental').val(client.husband.rental.value);
        $('#husbandRentalJoint').val(client.husband.rental.joint);
        $('#husbandRentalGST').prop('checked', client.husband.rental.gstReturn);
        $('#husbandT4E').val(client.husband.t4E);
        $('#husbandSelfEmployed').val(client.husband.selfEmployed.value);
        $('#husbandSelfEmployedJoint').val(client.husband.selfEmployed.joint);
        $('#husbandSelfEmployedGST').prop('checked', client.husband.selfEmployed.gstReturn);
        $('#husbandT4RSP').val(client.husband.t4RSP);
        $('#husbandSupportReceived').val(client.husband.supportReceived);
        $('#husbandUCCB').prop('checked', client.husband.uccb);

        $('#wifeT4').val(client.wife.t4);
        $('#wifeT5').val(client.wife.t5.value);
        $('#wifeT5Joint').val(client.wife.t5.joint);
        $('#wife104').val(client.wife.otherIncome.value104);
        $('#wife130').val(client.wife.otherIncome.value130);
        $('#wifeT5Other').val(client.wife.t5Other.value);
        $('#wifeT5OtherJoint').val(client.wife.t5Other.joint);
        $('#wifeDivCurrency').val(client.wife.foreignIncome.div.currency);
        $('#wifeDiv').val(client.wife.foreignIncome.div.value);
        $('#wifeEmplCurrency').val(client.wife.foreignIncome.empl.currency);
        $('#wifeEmpl').val(client.wife.foreignIncome.empl.value);
        $('#wifeCountry').val(client.wife.foreignIncome.country);
        $('#wifeT3').val(client.wife.t3.value);
        $('#wifeT3Joint').val(client.wife.t3.joint);
        $('#wifeT5007').val(client.wife.t5007);
        $('#wifeT4A').val(client.wife.t4A);
        $('#wifeT5008').val(client.wife.t5008.value);
        $('#wifeT5008Joint').val(client.wife.t5008.joint);
        $('#wifeT4AOAS').val(client.wife.t4AOAS);
        $('#wifeT5013').val(client.wife.t5013.value);
        $('#wifeT5013Joint').val(client.wife.t5013.joint);
        $('#wifeT4AP').val(client.wife.t4AP.value);
        $('#wifeSplit').prop('checked', client.wife.t4AP.split);
        $('#wifeRental').val(client.wife.rental.value);
        $('#wifeRentalJoint').val(client.wife.rental.joint);
        $('#wifeRentalGST').prop('checked', client.wife.rental.gstReturn);
        $('#wifeT4E').val(client.wife.t4E);
        $('#wifeSelfEmployed').val(client.wife.selfEmployed.value);
        $('#wifeSelfEmployedJoint').val(client.wife.selfEmployed.joint);
        $('#wifeSelfEmployedGST').prop('checked', client.wife.selfEmployed.gstReturn);
        $('#wifeT4RSP').val(client.wife.t4RSP);
        $('#wifeSupportReceived').val(client.wife.supportReceived);
        $('#wifeUCCB').prop('checked', client.wife.uccb);

        $('#husbandRRSP').val(client.husband.rrsp.value);
        $('#husbandRRSPJoint').val(client.husband.rrsp.spouse);
        $('#husband777').prop('checked', client.husband.value777);
        $('#husbandHBP').val(client.husband.hbp);
        $('#husbandSupportMade').val(client.husband.supportMade);
        $('#husbandMoving').prop('checked', client.husband.moving);
        $('#husbandUnion').prop('checked', client.husband.unionDue);
        $('#husbandDisability').prop('checked', client.husband.disabilitySupports);

        $('#wifeRRSP').val(client.wife.rrsp.value);
        $('#wifeRRSPJoint').val(client.wife.rrsp.spouse);
        $('#wife777').prop('checked', client.wife.value777);
        $('#wifeHBP').val(client.wife.hbp);
        $('#wifeSupportMade').val(client.wife.supportMade);
        $('#wifeMoving').prop('checked', client.wife.moving);
        $('#wifeUnion').prop('checked', client.wife.unionDue);
        $('#wifeDisability').prop('checked', client.wife.disabilitySupports);

        $('#carryingCharges').prop('checked', client.carryingCharges);
        $('#childcareName').val(client.childcare.name);
        $('#childcareAmount').val(client.childcare.amount);
        $('#childcareSin').val(client.childcare.sin);

        $('#husbandInstallation').val(client.husband.installation);
        $('#husbandTuition').prop('checked', client.husband.tuition);
        $('#husbandStudentLoan').prop('checked', client.husband.studentLoan);

        $('#wifeInstallation').val(client.wife.installation);
        $('#wifeTuition').prop('checked', client.wife.tuition);
        $('#wifeStudentLoan').prop('checked', client.wife.studentLoan);

        $('#caregiverName1').val(client.caregiver1.name);
        $('#caregiverAmount1').val(client.caregiver1.amount);
        $('#caregiverName2').val(client.caregiver2.name);
        $('#caregiverAmount2').val(client.caregiver2.amount);

        $('#dependentName1').val(client.dependentTuition1.name);
        $('#dependentAmount1').val(client.dependentTuition1.amount);
        $('#dependentName2').val(client.dependentTuition2.name);
        $('#dependentAmount2').val(client.dependentTuition2.amount);

        $('#publicTransit').prop('checked', client.publicTransit);
        $('#donation').prop('checked', client.donation);
        $('#medExp').prop('checked', client.medExp);
        $('#hbtc').prop('checked', client.hbtc);
        $('#disability').prop('checked', client.disability);
        $('#t2201').prop('checked', client.t2201);
        $('#equiv').prop('checked', client.equiv);

        $('#notes1').val(client.notes.one);
        $('#notes2').val(client.notes.two);
        $('#notes3').val(client.notes.three);

        $('#comments1').val(client.comments.one);
        $('#comments2').val(client.comments.two);
        $('#comments3').val(client.comments.three);

        $('#witb').prop('checked', client.witb);
        $('#ctb').prop('checked', client.ctb);
        $('#gst').prop('checked', client.gst);
        $('#prov').prop('checked', client.prov);
        $('#msp').prop('checked', client.msp);

        $('#consult').val(client.consultFee);
        $('#price').val(client.price);
    }
});