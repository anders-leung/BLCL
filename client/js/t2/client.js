$(document).ready(function () {
    if (!t2.shareholders || t2.shareholders.length === 0) {
        t2.shareholders = [{}];
    }
    
    updateShareholders();

    $('#shareholders').on('keyup', 'input', function () {
        var that = $(this);
        var index = that.parent().parent().index() - 1;
        var field = 'name';
        if (that.hasClass('spercent')) field = 'percent';

        t2.shareholders[index][field] = that.val();
    });

    $('#addShareholder').on('click', function () {
        t2.shareholders.push({});
        $('#shareholders').append(shareholderItem('', '', t2.shareholders.length));
    });

    $('#shareholders').on('click', '.btn-danger', function () {        
        var that = $(this);
        var li = that.parent().parent();
        var index = li.index() - 1;
        t2.shareholders.splice(index, 1);
        $('#shareholders').children().each(function (i) {
            if (i !== 0) $(this).remove();
        });
        updateShareholders();
    });

    function updateShareholders() {
        var shareholders = $('#shareholders');
        t2.shareholders.map((shareholder, index) => {
            var { name, percent } = shareholder;
            shareholders.append(shareholderItem(name || '', percent || '', index));
        });
    }

    function shareholderItem(name, percent, index) {
        return (`
            <li class='list-group-item' style='padding-bottom:0'>
                <div class='form-group col-8'>
                    <input class='form-control sname' name='shareholders[${index}][name]' value=${name}></input>
                </div>
                <div class='form-group col-3'>
                    <input class='form-control spercent' name='shareholders[${index}][percent]' value=${percent}></input>
                </div>
                <div class='form-group col-1'>
                    <span class='btn btn-danger'>
                        <i class='fa fa-times'></i>
                    </span>
                </div>
            </li>
        `);
    }
});