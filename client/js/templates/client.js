$(document).ready(function () {
    console.log('statuses: ', statuses)
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
            var that = $(this);
            if (that.val() === ui.item.label) return;
            that.val(ui.item.label);
            $('#name').val(ui.item.value);
            updateUI(ui.item.value);
        },
    });

    function updateUI(id) {
        clients.map((client) => {
            if (client._id === id) {
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

                $('#industry option').each(function () {
                    var that = $(this);
                    if (client.industry === that.val()) {
                        that.attr('selected', true);
                    }
                });

                var select = $('#status');
                var clone = select.clone();
                var span = select.parent();
                var parent = span.parent();
                statuses.map((status) => {
                    var hasStatus = client.status.includes(status);
                    clone.append(`
                        <option ${hasStatus ? 'selected' : ''}>${status}</option>
                    `)
                });
                var width = clone.data('width');
                span.remove();
                clone.appendTo(parent);
                clone.multiselect({
                    maxHeight: 300,
                    enableCaseInsensitiveFiltering: true,
                    buttonWidth: width,
                    numberDisplayed: 100
                });
            }
        });
    }
});