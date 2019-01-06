$(document).ready(function () {
    var socket = io();

    $('#addFile').on('click', function () {
        $('#uploadFile').click();
    });

    $('#uploadFile').on('change', function () {
        var value = $(this).val();
        var tokens = value.split('.');

        if (tokens[1] !== 'docx') return;

        $('#noTemplates').hide();

        var filePath = tokens[0];
        tokens = filePath.split('\\');
        var name = tokens[tokens.length - 1];
        $('.list-group').append(listItem(name));
        socket.emit('templates', {
            action: 'create',
            name
        });
        $(this).val('');
    });

    $(this).on('click', '.badge-danger', function () {
        var parent = $(this).parent();
        var name = $(parent).text();
        $(parent).remove();
        var listGroup = $('.list-group');
        if (listGroup.children().length === 0) {
            $('#noTemplates').show();
        }
        var template = getTemplate(name)
        socket.emit('templates', {
            action: 'delete',
            _id: template._id,
        });
        $('.active').removeClass('active');
    });

    $(this).on('click', '.list-group-item', function () {
        $('.active').removeClass('active');
        $(this).addClass('active');
        var name = $(this).text();
        var template = getTemplate(name);
        $('option').each(function () {
            var value = $(this).val();
            if (template.variables.includes(value)) {
                $(this).attr('selected', true);
            }
        });
        $('#updateTemplate').removeAttr('disabled')
    });

    $('#updateTemplate').on('click', function () {
        var name = $('.active').text();
        var variables = $('#variables').val();
        var template = getTemplate(name);
        socket.emit('templates', {
            action: 'update',
            _id: template._id,
            variables
        });
    });

    function getTemplate(name) {
        var template = templates.filter((template) => {
            return template.name === name;
        });
        return template[0];
    }
});

function listItem(name) {
    return (`
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${name}
            <span class="badge badge-danger badge-pill">
                <i class="fa fa-times"></i>
            </span>
        </li>
    `)
}