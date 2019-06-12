var removeButton = '<div class="col-1"><div class="form-group"><p class="btn btn-danger" style="margin-top:25px"><i class="fa fa-trash-alt"></i></p></div></div>'

$(document).ready(function() {
    if (invoice) {
        populateFields(invoice);
    }

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
            $('#client').val(ui.item.value);
        },
        select: function(event, ui) {
            event.preventDefault();
            $(this).val(ui.item.label);
            $('#client').val(ui.item.value);
        },
    });

    $('#newClient').on('click', function() {
        let show = this.checked;
        $('.toggle').each(function() {
            $(this).attr('hidden', !show);
        });
    });
    
    $(this).on('click', 'i', function() {
        $(this).toggleClass('fa-lock');
        $(this).toggleClass('fa-lock-open');
        let input = $(this).parent().parent().find('input');
        if ($(this).hasClass('fa-lock')) {
            $(input).attr('disabled', true);
            $(input).attr('readonly', false);
            $(input).val('');
        } else {
            $(input).attr('disabled', false);
            $(input).attr('readonly', true);
            var amount = $(input).parent().parent().prev();
            var tax = 0;
            if (input[0].name.includes('gst')) {
                tax = $(amount).find('input').val() * GST;
            } else {
                tax = $(amount).prev().find('input').val() * PST;
            }
            $(input).val(tax ? convert(tax) : '0.00');
        }
        setTotal();
    })

    $(this).on('click', 'p', function() {
        var children = $(this).parent().parent().parent().parent().children();
        if (children.length > 1) {
            $(this).parent().parent().parent().remove();
            setTotal();
        }
    });

    $(this).on('keyup', '.col-3 input', function(e) {
        var int = e.target.value;
        var parentGroup = $(this).parent().parent();
        
        var gstGroup = $(parentGroup).next();
        var enableGst = $(gstGroup).find('i').hasClass('fa-lock-open')
        if (enableGst) {
            var gst = int * GST;
            $(gstGroup).find('input').val(convert(gst));
        }

        var pstGroup = $(parentGroup).next().next();
        var enablePst = $(pstGroup).find('i').hasClass('fa-lock-open')
        if (enablePst) {
            var pst = int * PST;
            $(pstGroup).find('input').val(convert(pst));
        }
        setTotal();
    });

    $('#addService').on('click', addService);

    $('form').on('submit', function(e) {
        window.open('/invoice/invoices');
    });

    $(this).on('change', 'select', function() {
        if (this.name === 'company') return;
        var textarea = $(this).parent().parent().parent().find('textarea');
        var service = $(this).val();
        textarea.val(descriptions[service]);
    });
});

function addService() {
    var services = $('#services').find('.row input');
    var last = services[services.length - 1];
    var index = parseInt(last.name.split('[')[1][0]) + 1;
    var html = '';
    var service = 'services[' + index + ']';
    html += col(2, label(service + 'Service', 'Service') + select(service + 'Service', service + '[service]'));
    html += col(9, label(service + 'Details', 'Details') + input(service + 'Details', service + '[details]'));
    html += removeButton;
    html += col(3, label(service + 'Amount', 'Amount') + input(service + 'Amount', service + '[amount]'), 'offset-4');
    html += col(2, label(service + 'Gst', 'GST', 'gst') + input(service + 'Gst', service + '[gst]'));
    html += col(2, label(service + 'Pst', 'PST', 'pst') + input(service + 'Pst', service + '[pst]'));
    $(last).closest('.row').after(div(html));
}

function div(string) {
    return '<div class="row">' + string + '</div>';
}

function col(size, content, offset='') {
    return '<div class="' + offset + ' col-' + size + '">' + '<div class="form-group">' + content + '</div></div>';
}

function label(name, label, tax) {
    var lock = '<i class="fas fa-lock-open"></i>';
    if (tax === 'pst') {
        lock = '<i class="fas fa-lock"></i>';
    }

    return '<label for="' + name + '"> ' + label + (tax ? lock : '') + '</label>';
}

function input(id, name) {
    var disabled = '';
    var fixed = '';
    var type = 'text';
    var value = '';
    var extra = '';
    var rows = '';
    var input = 'input';
    if (name.includes('gst') || name.includes('pst')) disabled = ' readonly';
    if (name.includes('amount')) {
        fixed += ' fixed';
        type = 'number';
        extra = ' step="0.01" ';
    }
    if (name.includes('to') || name.includes('from')) fixed += ' datepicker'
    if (name.includes('gst')) value = ' value="0.00"';
    if (name.includes('details')) {
        input = 'textarea';
        rows = ' rows="4"';
    }
    var html = '<' + input + ' id="' + id + '" class="form-control' + fixed + '" type="' + type + extra + '" name="' + name + '"' + value + disabled + rows + '>';
    if (name.includes('details')) html += '</textarea>';
    return html;
}

function select(id, name) {
    var html = '';
    html += '<select class="form-control" name="' + name + '">';
    html += '<option></option>'
    for (var service of services) {
        html += '<option value="' + service + '">' + service + '</option>';
    }
    html += '</select>';
    return html;
}

function convert(value) {
    const tokens = value.toString().split('.');
    if (tokens.length === 1) return value + '.00';
    let integer = tokens[0];
    var decimal = tokens[1];
    if (decimal.length > 2) {
        if (decimal[2] > 4) {
            decimal = decimal.substring(0, 1) + (Number(decimal[1]) + 1);
        }
    } else {
        decimal = decimal + '0';
    }
    if (isNaN(integer)) integer = 0;
    return integer + '.' + decimal.substring(0, 2);
}

function setTotal() {
    let sum = 0;
    $('input').filter(function() {
        return this.name.includes('gst') || this.name.includes('pst') || this.name.includes('amount');
    }).each(function() {
        let value = parseFloat($(this).val());
        if (isNaN(value)) value = 0;
        sum += value;
    });

    if (isNaN(sum)) sum = 0;

    $('#total').val(parseFloat(sum).toFixed(2));
}

function populateFields(invoice) {
    var client = invoice.client;
    if (!client) {
        client = invoice.oneTimeClient;
        $('#newClient').click();
        $('.toggle').each(function() {
            $(this).attr('hidden', false);
        });
        const name = '[name="client[address]';
        const { address, phone, fax, email } = client;
        $(`${name}[apartment]`).val(address.apartment);
        $(`${name}[street]`).val(address.street);
        $(`${name}[city]`).val(address.city);
        $(`${name}[province]`).val(address.province);
        $(`${name}[postalCode]`).val(address.postalCode);
        $('#phone').val(phone);
        $('#fax').val(fax);
        $('#email').val(email);
    } else {
        $('#client').val(client._id);
    }
    $('#clientString').val(client.name);

    $('#company').val(invoice.company);
    invoice.services.map(function (s, index) {
        if (index > 0) addService();
        const name = `[name="services[${index}]`;
        const { service, details, amount, gst, pst } = s;
        $(`select${name}[service]"`).val(service);
        $(`textarea${name}[details]"`).val(details);
        $(`input${name}[amount]"`).val(amount);
        $(`input${name}[gst]"`).val(gst);
        $(`input${name}[pst]"`).val(pst);
    });
    $('#total').val(invoice.total)
}