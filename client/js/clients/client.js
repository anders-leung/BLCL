$(document).ready(function () {
    updateUI();

    $('#templates').on('dblclick', 'option', function () {
        var value = $(this).val();
        client.files.push(value);
        updateUI();
    });

    $(this).on('click', '.deleteFile', function () {
        var value = $(this).parent().text().trim();
        files.map((file) => {
            if (file.name === value) {
                var index = client.files.indexOf(file._id);
                client.files.splice(index, 1);
            }
        });
        updateUI();
    });
    
    function updateUI() {
        $('#files').empty();
        files.map((file) => {
            var id = file._id;
            var name = file.name;
            var option = $(`option[value="${id}"]`);
            if (client.files.includes(id)) {
                $('#files').append(listItem(name));
                option.css('display', 'none');
                option.attr('selected', true);
                hasAFile = true;
            } else {
                option.css('display', 'block');
                option.removeAttr('selected');
            }
        });

        $('#fileCount').text(`Client has ${client.files.length} ${client.files.length === 1 ? 'file' : 'files'}.`);
    }
});

function listItem(value) {
    return (`
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${value}
            <span class="deleteFile badge badge-danger badge-pill">
                <i class="fa fa-times"></i>
            </span>
        </li>
    `);
}