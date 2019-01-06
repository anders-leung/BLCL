$(document).ready(function() {
    var socket = io();

    socket.on('description update', function (data) {
        descriptions[data.service] = data.description;
        setTimeout(function () {
            $('#save').attr('disabled', false).val('Save');
        }, 1500);
    });

    $('#service').on('change', function () {
        var service = $(this).val();
        $('textarea').val(descriptions[service])
    });

    $('#addService').on('click', function (e) {
        var newService = $('#newService').val();
        if (!newService) {
            return e.preventDefault();
        } else {
            newService = newService.toUpperCase();
            descriptions[newService] = '';
            $('option').remove();
            Object.keys(descriptions).sort().map(function (service) {
                var option = document.createElement('option');
                option.value = service;
                option.innerHTML = service;
                if (service === newService) {
                    option.selected = true;   
                }
                $('select').append(option);
            });
            $('#newService').val('');
            $('textarea').val(descriptions[newService]);
            $('#addService').attr('disabled', true).val('Added!');

            socket.emit('description update', { service: newService });

            setTimeout(function () {
                $('#addService').attr('disabled', false).val('Add Service');
            }, 1500);
        }
    });

    $('#save').on('click', function (e) {
        e.preventDefault();
        var service = $('option:selected').val();
        var description = $('textarea').val();

        if (!service) return;

        $(this).attr('disabled', true).val('Saving, please wait');

        socket.emit('description update', {
            service: service,
            description: description
        });
    });
});