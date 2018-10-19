/**
 * Created by ander on 2017-10-30.
 */
$(document).ready(function(e) {
    $('.datepicker').datepicker({
        dateFormat: 'yy-M-dd'
    });

    $('.datepickerChangeYear').datepicker({
        dateFormat: 'yy-M-dd',
        changeMonth: true,
        changeYear: true,
        yearRange: '-80:+0'
    });
    
    $('.scroll-container').onePageScroll({
        sectionSelector: $('.content-part')
    });
    
    // Phone formatting
    $('.phone').on('keyup', function(e) {
        var key = e.keyCode || e.charCode;
        if (key == 8 || key == 46) {
            return false;
        }
        var number = $(this);
        var value = number.val();

        if (e.keyCode >= 48 && e.keyCode <= 57) {
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

    $('.postalCode').on('keyup', function(e) {
        var key = e.keyCode || e.charCode;
        if (key == 8 || key == 46) return false;

        var postalCode = $(this);
        var value = postalCode.val();
        if (value.length > 7) {
            postalCode.val(value.substring(0, value.length - 1));
        }
        
        if (value.length == 3) postalCode.val(value + ' ');
    })
});