/**
 * Created by ander on 2017-05-10.
 */
$(document).ready(function(e) {    
    if (newClient) {
        $('#newTel').prop('checked', true);
        $('#newCell').prop('checked', true);
        $('#newEmail').prop('checked', true);
        $('#newAddress').prop('checked', true);
    }

    // Setup the year
    var year = (new Date()).getYear();
    year = year + 1899;
    $('#year').val(year);

    function populateSelect(name, options) {
        if (name == 'initials') {
            $('.' + name).each(function() {
                for (var i = 0; i < options.length; i++) {
                    $(this).append($('<option>', {
                        text: options[i]
                    }));
                }
            });
            return;
        }
        for (var i = 0; i < options.length; i++) {
            $('#' + name).append($('<option>', {
                text: options[i]
            }));
        }
    }

    for (var select in options) {
        if (select == 'relationship') {
            for (var j = 1; j < 4; j++) {
                populateSelect(select + j, options[select]);
            }
        } else {
            populateSelect(select, options[select]);
        }
    }

    if (client) {
        $('#year').val(client.year);
        $('#interviewer').val(client.interviewer);
        $('#preparer').val(client.preparer);
        $('#checker').val(client.checker);
        $('#pickupDate').val(client.pickupDate);
        $('#interviewDate').val(client.interviewDate);
        $('#returns').val(client.numberOfReturns);
        $('#method').val(client.method);
        //$('#t1135').val(client.t1135);
        $('#group').val(client.group);
        $('#slips').prop('checked', client.slips);
        $('#stocks').prop('checked', client.stocks);
        $('#confirmPickupDate').prop('checked', client.confirmPickupDate);
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
        $('.postalCode').val(client.address.postalCode);
        //$('#country').val(client.address.country);

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

        if (client.husband) {
            $('#husbandFirstName').val(client.husband.firstName);
            $('#husbandLastName').val(client.husband.lastName);
            $('#husbandDob').val(client.husband.dateOfBirth);
            $('#husbandDepartureWhich').val(client.husband.departure.which);
            $('#husbandDeparture').val(client.husband.departure.value);
            $('#husbandStatus').val(client.husband.status);
            $('#husbandSin').val(client.husband.sin);
            $('#husbandCitizenship').prop('checked', client.husband.citizenship);
            $('#husbandElection').prop('checked', client.husband.election);
            $('#husbandNoa').prop('checked', client.husband.noa);

            $('#husbandT4').prop('checked', client.husband.t4.value);
            $('#husbandT4Blcl').prop('checked', client.husband.t4.blcl);
            $('#husbandT5').prop('checked', client.husband.t5.value);
            $('#husbandT5Joint').prop('checked', client.husband.t5.joint);
            $('#husbandT5Blcl').prop('checked', client.husband.t5.blcl);
            $('#husband104').val(client.husband.otherIncome.value104);
            $('#husband130').val(client.husband.otherIncome.value130);
            $('#husbandT5Other').prop('checked', client.husband.t5Other.value);
            $('#husbandT5OtherJoint').prop('checked', client.husband.t5Other.joint);
            $('#husbandDivCurrency').val(client.husband.foreignIncome.div.currency);
            $('#husbandDiv').val(client.husband.foreignIncome.div.value);
            $('#husbandEmplCurrency').val(client.husband.foreignIncome.empl.currency);
            $('#husbandEmpl').val(client.husband.foreignIncome.empl.value);
            $('#husbandCountry').val(client.husband.foreignIncome.country);
            $('#husbandT3').prop('checked', client.husband.t3.value);
            $('#husbandT3Joint').prop('checked', client.husband.t3.joint);
            $('#husbandT5007').prop('checked', client.husband.t5007);
            $('#husbandT4A').prop('checked', client.husband.t4A.value);
            $('#husbandT4ABlcl').prop('checked', client.husband.t4A.blcl);
            $('#husbandT5008').prop('checked', client.husband.t5008.value);
            $('#husbandT5008Joint').prop('checked', client.husband.t5008.joint);
            $('#husbandT4AOAS').prop('checked', client.husband.t4AOAS);
            $('#husbandT5013').prop('checked', client.husband.t5013.value);
            $('#husbandT5013Joint').prop('checked', client.husband.t5013.joint);
            $('#husbandT4AP').prop('checked', client.husband.t4AP.value);
            $('#husbandSplit').prop('checked', client.husband.t4AP.split);
            $('#husbandRental').val(client.husband.rental.value);
            $('#husbandRentalJoint').val(client.husband.rental.joint);
            $('#husbandRentalGST').prop('checked', client.husband.rental.gstReturn);
            $('#husbandT4E').prop('checked', client.husband.t4E);
            $('#husbandSelfEmployed').val(client.husband.selfEmployed.value);
            $('#husbandSelfEmployedJoint').val(client.husband.selfEmployed.joint);
            $('#husbandSelfEmployedGST').prop('checked', client.husband.selfEmployed.gstReturn);
            $('#husbandT4RSP').prop('checked', client.husband.t4RSP);
            $('#husbandSupportReceived').val(client.husband.supportReceived);
            $('#husbandUCCB').prop('checked', client.husband.uccb);

            $('#husbandRRSP').prop('checked', client.husband.rrsp.value);
            $('#husbandRRSPSpouse').prop('checked', client.husband.rrsp.spouse);
            $('#husband777').prop('checked', client.husband.value777);
            $('#husbandHBP').prop('checked', client.husband.hbp);
            $('#husbandSupportMade').val(client.husband.supportMade);
            $('#husbandMoving').prop('checked', client.husband.moving);
            $('#husbandUnion').prop('checked', client.husband.unionDue);
            $('#husbandDisability').prop('checked', client.husband.disabilitySupports);

            $('#husbandInstallment').val(client.husband.installment);
            $('#husbandTuition').prop('checked', client.husband.tuition);
            $('#husbandStudentLoan').prop('checked', client.husband.studentLoan);
        }

        if (client.wife) {
            $('#wifeFirstName').val(client.wife.firstName);
            $('#wifeLastName').val(client.wife.lastName);
            $('#wifeDob').val(client.wife.dateOfBirth);
            $('#wifeDepartureWhich').val(client.wife.departure.which);
            $('#wifeDeparture').val(client.wife.departure.value);
            $('#wifeStatus').val(client.wife.status);
            $('#wifeSin').val(client.wife.sin);
            $('#wifeCitizenship').prop('checked', client.wife.citizenship);
            $('#wifeElection').prop('checked', client.wife.election);
            $('#wifeNoa').prop('checked', client.wife.noa);

            $('#wifeT4').prop('checked', client.wife.t4.value);
            $('#wifeT4Blcl').prop('checked', client.wife.t4.blcl);
            $('#wifeT5').prop('checked', client.wife.t5.value);
            $('#wifeT5Joint').prop('checked', client.wife.t5.joint);
            $('#wifeT5Blcl').prop('checked', client.wife.t5.blcl);
            $('#wife104').val(client.wife.otherIncome.value104);
            $('#wife130').val(client.wife.otherIncome.value130);
            $('#wifeT5Other').prop('checked', client.wife.t5Other.value);
            $('#wifeT5OtherJoint').prop('checked', client.wife.t5Other.joint);
            $('#wifeDivCurrency').val(client.wife.foreignIncome.div.currency);
            $('#wifeDiv').val(client.wife.foreignIncome.div.value);
            $('#wifeEmplCurrency').val(client.wife.foreignIncome.empl.currency);
            $('#wifeEmpl').val(client.wife.foreignIncome.empl.value);
            $('#wifeCountry').val(client.wife.foreignIncome.country);
            $('#wifeT3').prop('checked', client.wife.t3.value);
            $('#wifeT3Joint').prop('checked', client.wife.t3.joint);
            $('#wifeT5007').prop('checked', client.wife.t5007);
            $('#wifeT4A').prop('checked', client.wife.t4A.value);
            $('#wifeT4ABlcl').prop('checked', client.wife.t4A.blcl);
            $('#wifeT5008').prop('checked', client.wife.t5008.value);
            $('#wifeT5008Joint').prop('checked', client.wife.t5008.joint);
            $('#wifeT4AOAS').prop('checked', client.wife.t4AOAS);
            $('#wifeT5013').prop('checked', client.wife.t5013.value);
            $('#wifeT5013Joint').prop('checked', client.wife.t5013.joint);
            $('#wifeT4AP').prop('checked', client.wife.t4AP.value);
            $('#wifeSplit').prop('checked', client.wife.t4AP.split);
            $('#wifeRental').val(client.wife.rental.value);
            $('#wifeRentalJoint').val(client.wife.rental.joint);
            $('#wifeRentalGST').prop('checked', client.wife.rental.gstReturn);
            $('#wifeT4E').prop('checked', client.wife.t4E);
            $('#wifeSelfEmployed').val(client.wife.selfEmployed.value);
            $('#wifeSelfEmployedJoint').val(client.wife.selfEmployed.joint);
            $('#wifeSelfEmployedGST').prop('checked', client.wife.selfEmployed.gstReturn);
            $('#wifeT4RSP').prop('checked', client.wife.t4RSP);
            $('#wifeSupportReceived').val(client.wife.supportReceived);
            $('#wifeUCCB').prop('checked', client.wife.uccb);

            $('#wifeRRSP').prop('checked', client.wife.rrsp.value);
            $('#wifeRRSPSpouse').prop('checked', client.wife.rrsp.spouse);
            $('#wife777').prop('checked', client.wife.value777);
            $('#wifeHBP').prop('checked', client.wife.hbp);
            $('#wifeSupportMade').val(client.wife.supportMade);
            $('#wifeMoving').prop('checked', client.wife.moving);
            $('#wifeUnion').prop('checked', client.wife.unionDue);
            $('#wifeDisability').prop('checked', client.wife.disabilitySupports);

            $('#wifeInstallment').val(client.wife.installment);
            $('#wifeTuition').prop('checked', client.wife.tuition);
            $('#wifeStudentLoan').prop('checked', client.wife.studentLoan);
        }

        $('#carryingCharges').prop('checked', client.carryingCharges);
        $('#childcareName').val(client.childcare.name);
        $('#childcareAmount').val(client.childcare.amount);
        $('#childcareSin').val(client.childcare.sin);

        $('#caregiverName1').val(client.caregiver1.name);
        $('#caregiverAmount1').val(client.caregiver1.amount);
        $('#caregiverName2').val(client.caregiver2.name);
        $('#caregiverAmount2').val(client.caregiver2.amount);

        $('#dependentName1').val(client.dependentTuition1.name);
        $('#dependentAmount1').val(client.dependentTuition1.amount);
        $('#dependentName2').val(client.dependentTuition2.name);
        $('#dependentAmount2').val(client.dependentTuition2.amount);

        $('#art').prop('checked', client.art);
        $('#fitness').prop('checked', client.fitness);
        $('#publicTransit').prop('checked', client.publicTransit);
        $('#donation').val(client.donation ? 'Y' : 'N');
        $('#medExp').val(client.medExp ? 'Y' : 'N');
        $('#hbtc').prop('checked', client.hbtc);
        $('#disability').prop('checked', client.disability);
        $('#t2201').prop('checked', client.t2201);
        $('#equiv').prop('checked', client.equiv);
        $('#teachingSupplies').prop('checked', client.teachingSupplies);
        $('#homeAccessibilities').prop('checked', client.homeAccessibilities);

        $('#notes1').val(client.notes.one);
        $('#notes2').val(client.notes.two);
        $('#notes3').val(client.notes.three);

        $('#comments1').val(client.comments.one);
        $('#comments2').val(client.comments.two);
        $('#comments3').val(client.comments.three);
        
        $('#outstandingInfo').val(client.outstandingInfo);

        $('#witb').prop('checked', client.witb);
        $('#ctb').prop('checked', client.ctb);
        $('#gst').prop('checked', client.gst);
        $('#prov').prop('checked', client.prov);
        $('#msp').prop('checked', client.msp);
        $('#dd').prop('checked', client.dd);

        $('#consult').val(client.consultFee);
        $('#price').val(client.price);
    }

    $('form').on('submit', function() {
        // to each unchecked checkbox
        $('input[type="checkbox"]:not(:checked)').each(function () {
            // set value 0 and check it
            $(this).prop('checked', true).val(0);
        });
    });
});