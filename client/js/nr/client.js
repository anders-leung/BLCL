var removeButton = '<p class="btn btn-danger" style="margin:20px 10px 0 10px"><i class="fa fa-trash-alt"></i></p>'

$(document).ready(function() {
    $('#properties').find('.row').each(function(e) {
        $(this).append(removeButton)
    });

    $('#properties').on('click', '.btn.btn-danger', function(e) {
        var parent = $(this).parent().parent().parent();
        var children = $(parent).children();
        if (children.length > 4) {
            $(this).parent().parent().remove();
        }
        updateIndices();
    });

    $('#addProperty').on('click', function(e) {
        var properties = $('#properties').find('.row input');
        var last = properties[properties.length - 1];
        var index = parseInt(last.name.split('[')[1][0]) + 1;
        $(last).closest('.form-group').after(address(index));
    });
    

    function updateIndices() {
        $('#properties').find('.form-group').each(function (i) {
            $(this).find('input').each(function () {
                var oldName = $(this).attr('name');
                var oldNameTokens = oldName.split('properties[');
                var newName = 'properties[' + i + oldNameTokens[1].substring(1, oldNameTokens[1].length);
                $(this).attr('name', newName);
            });
        });
    }
});

function address(index) {
    return (
        `<div class="form-group">
            <div class="row">
                <div class="col-2">
                    <label>Apartment</label>
                    <input class="form-control" name="properties[${index}][apartment]"/>
                </div>
                <div class="col-3">
                    <label>Street</label>
                    <input class="form-control" name="properties[${index}][street]" required/>
                </div>
                <div class="col-2">
                    <label>City</label>
                    <input class="form-control" name="properties[${index}][city]"/>
                </div>
                <div class="col-1">
                    <label>Province</label>
                    <input class="form-control" name="properties[${index}][province]"/>
                </div>
                <div class="col-2">
                    <label>Postal Code</label>
                    <input class="form-control" name="properties[${index}][postalCode]"/>
                </div>
                ${removeButton}
            </div>
        </div>
        `
    );
}