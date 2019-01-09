$(document).ready(function () {
    $('#clientString').autocomplete({
        source: clients.map((client) => {
            return {
                label: client.name,
                value: client._id,
            }
        }),
        focus: function(event, ui) {
            event.preventDefault();
            $(this).val(ui.item.label);
            $('#name').val(ui.item.value);
            updateUI(ui.item.value);
        },
        select: function(event, ui) {
            event.preventDefault();
            $(this).val(ui.item.label);
            $('#name').val(ui.item.value);
            updateUI(ui.item.value);
        },
    });

    function updateUI(id) {
        clients.map((client) => {
            if (client._id === id) {
                $('#status options').each(function () {
                    var value = $(this).val();
                    if (client.status === value) {
                        $(this).attr('selected', true);
                    }
                });

                var newClientDate = client.newClientDate;
                if (newClientDate) {
                    if (typeof newClientDate === 'string') {
                        newClientDate = new Date(newClientDate);
                    }
                    newClientDate = newClientDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
                }
                
                $('#newClientDate').val(newClientDate);
                $('#title').val(client.contact.title);
                $('#firstName').val(client.contact.firstName);
                $('#lastName').val(client.contact.lastName);
                $('#phone').val(client.phone);
                $('#fax').val(client.fax);
                $('#email').val(client.email);
                $('#addressApartment').val(client.address.apartment);
                $('#addressStreet').val(client.address.street);
                $('#addressCity').val(client.address.city);
                $('#addressProvince').val(client.address.province);
                $('#addressCountry').val(client.address.country);
                $('#addressPostalCode').val(client.address.postalCode);
            }
        });
    }
});