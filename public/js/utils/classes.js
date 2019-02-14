/**
 * Created by ander on 2017-10-30.
 */
$(document).ready(function(e) {
    $('.multiselect').each(function () {
        var that = $(this);
        var width = that.data('width');
        that.multiselect({
            buttonClass: 'btn btn-secondary',
            maxHeight: 300,
            enableCaseInsensitiveFiltering: true,
            buttonWidth: width,
            numberDisplayed: 100
        });
    });
    
    $('.datepicker').datepicker({
        dateFormat: 'M d, yy'
    });

    $('.datepickerChangeYear').datepicker({
        dateFormat: 'M d, yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-80:+0'
    });
    
    $('.scroll-container').onePageScroll({
        sectionSelector: $('.content-part')
    });
    
    // Phone formatting
    $('.phone').on('input', function(e) {
        var input = e.originalEvent.data;
        if (!input) return;

        var number = $(this);
        var value = number.val();

        if (value.length == 3) {
            number.val('(' + value + ') ');
        } else if(value.length == 9) {
            number.val(value + '-');
        }
        if (value.length > 14 || !input.match(/[0-9]/g)) {
            number.val(value.substring(0, value.length - 1));
        }
    });

    // Sin formatting
    $('.sin').on('input', function(e) {
        var input = e.originalEvent.data;
        if (!input) return;

        var sin = $(this);
        var value = sin.val();
        
        if (value.length > 11) {
            sin.val(value.substring(0, value.length - 1));
        }
        if (value.length == 3 || value.length == 7) {
            sin.val(value + '-');
        }
    });

    $('.postalCode').on('input', function(e) {
        var input = e.originalEvent.data;
        if (!input) return;

        var postalCode = $(this);
        var value = postalCode.val();

        if (value.length > 7) {
            postalCode.val(value.substring(0, value.length - 1));
        }
        
        if (value.length == 3) postalCode.val(value + ' ');

        postalCode.val(value.toUpperCase());
    });
});