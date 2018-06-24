$(document).ready(function() {
    $('.scroll-container').onePageScroll({
        sectionSelector: $('.content-part')
    });

    $('#addProperty').on('click', function(e) {
        e.preventDefault();
        var properties = $('#properties').find('.row input');
        var last = properties[properties.length - 1];
        var index = parseInt(last.name.split('[')[1][0]) + 1;
        var html = '';
        var property = 'properties[' + index + ']';
        var fields = [ 'Apartment', 'Street', 'City', 'Province', 'Postal Code' ];
        for (var i = 0; i < fields.length; i++) {
            var size = 2;
            if (fields[i] == 'Street') size = 3;
            if (fields[i] == 'Province') size = 1;
            html += col(size, label(property + fields[i], fields[i]) + input(property + fields[i], property + '.' + fields[i].toLowerCase()));
        }
        $(last).closest('.row').after(div(html));
    });

    if (client) {
        var paths = keyify(client);
        for (var i = 0; i < paths.length; i++) {
            var name = paths[i];
            name = name.replace(/(\[)(\])/g, '\\\\$1\\\\$2');
            if (paths[i].includes('_')) {
                name = paths[i].split('._')[0];
                $('[name="' + name + '"]').prop('checked', true);
            } else {
                $('[name="' + name + '"]').val(Object.byString(client, paths[i]));
            }
        }
    }
});

function div(string) {
    return '<div class="row">' + string + '</div>';
}

function col(size, content) {
    return '<div class="col-' + size + '">' + content + '</div>';
}

function label(name, label) {
    return '<label for="' + name + '"> ' + label + '</label>';
}

function input(id, name) {
    return '<input id="' + id + '" class="form-control" type="text" name="' + name + '">';
}

function keyify(obj, prefix = '') {
    return Object.keys(obj).reduce(function(res, el) {
        if (Array.isArray(obj[el])) {
            var map = obj[el].map(function(x, i) {
                if (typeof(x) === 'object') {
                    return keyify(x, el + '[' + i + ']' + '.');
                } else {
                    return el + '[' + i + ']'
                }
            });
            if (Array.isArray(map[0])) {
                var temp = [];
                map.map(function(x) {
                    temp = temp.concat(x);
                });
                map = temp;
            }
            return [...res, ...map];
        } else if( obj[el] !== null && typeof(obj[el]) === 'object' ) {
            return [...res, ...keyify(obj[el], prefix + el + '.')];
        } else {
            return [...res, prefix + el];
        }
    }, []);
}

  Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}