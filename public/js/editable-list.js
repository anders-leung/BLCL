$(document).ready(function () {
    if (!schema) return;
    
    // Function to create an empty entry for the given field
    function createEmpty(field) {
        var r = {};
        var fields = schema[field];
    
        if (fields.length > 0) {
            fields.map((field) => {
                r[field] = '';
            });
            return r;
        } else {
            return '';
        }
    }

    // Setup all the fields if they're empty or don't exist
    Object.keys(schema).map((field) => {
        var ref = object[field];
        if (!ref || ref.length === 0) {
            object[field] = [createEmpty(field)];
        }
    });

    console.log('after setup: ', object);
    
    // Update all the lists with their relevant information
    Object.keys(schema).map((field) => {
        updateList(field);
    });

    // On editing a one of the list items of the list group.
    // Grab the index of the input, and the related field denoted by the data-field,
    // then check for nested fields, and finally, set the value in the object's field
    $(this).on('keyup', '.editable input', function () {
        var that = $(this);
        var index = that.parent().parent().index() - 1;
        var field = that.data('field');
        var nestedField = that.data('nestedfield');

        if (nestedField) {
            object[field][index][nestedField] = that.val();
        } else {
            object[field][index] = that.val();
        }

        // Keep log to debug whether the fields are updated accordingly
        console.log(object)
    });

    // When adding a new list item, grab the field in data-field, 
    // add an empty entry to the field, and append one to the list group
    $('.add').on('click', function () {
        var that = $(this);
        var field = that.data('field');
        object[field].push(createEmpty(field));

        var inputs = [object[field].length, field];
        var nestedFields = schema[field];

        if (nestedFields.length > 0) {
            inputs.push(true);
            nestedFields.map((nestedField) => {
                inputs.push(nestedField);
                inputs.push('');
            });
        } else {
            inputs.push(false);
            inputs.push('');
        }

        $(`#${field}`).append(listItem(...inputs));
    });

    // When delete is clicked, find the index, and the respective list.
    // empty all children and add them back, this is to avoid iterating the existing
    // list and updating the name indices
    $(this).on('click', '.delete', function () {
        var that = $(this);
        var li = that.parent().parent();
        var index = li.index() - 1;
        var field = li.parent().attr('id');
        object[field].splice(index, 1);
        $(`#${field}`).children().each(function (i) {
            if (i !== 0) $(this).remove();
        });
        updateList(field);
    });

    // For the list based on the given field, grab all the values,
    // and iterate them, populating if there are nested fiels.
    function updateList(field) {
        var list = $(`#${field}`);
        var values = object[field];
        var nested = false;

        if (schema[field].length > 0) {
            nested = true;
        }
        
        values.map((value, index) => {
            var inputs = [index, field, nested];
            if (nested) {
                Object.keys(value).map((nestedField) => {
                    if (nestedField === '_id') return;
                    inputs.push(nestedField);
                    inputs.push(value[nestedField] || '');
                });
            } else {
                inputs.push(value || '');
            }

            console.log('inputs: ', inputs)
            list.append(listItem(...inputs));
        });
    }

    // Create a list item based on the given values.
    // First must be the index, second is the field/list, and whether this list
    // has nested values. If nested, the pattern is [{nestedField}, {value}],
    // otherwise, it is just a list of values.
    function listItem(...values) {
        var index = values[0];
        var field = values[1];
        var nested = values[2];
        var inputs = [];
        
        values.splice(0, 3);
        if (nested) {
            for (var i = 0; i < values.length; i += 2) {
                inputs.push({
                    nestedField: values[i],
                    value: values[i + 1],
                });
            }
        } else {
            values.map((value) => {
                inputs.push({ value });
            });
        }

        var listItem = `
            <li class='list-group-item' style='padding-bottom:0'>
        `;

        inputs.map((input) => {
            var { nestedField, value } = input;
            listItem += `
                <div class='form-group col editable'>
                    <input 
                        class='form-control'
                        data-field=${field}
                        ${nestedField ? `data-nestedfield=${nestedField}` : ''}
                        name='${field}[${index}]${nestedField ? `[${nestedField}]` : ''}'
                        value='${value}'
                        required>
                    </input>
                </div>
            `;
        });
        
        listItem += `
            <div class='form-group col-1'>
                <span class='delete btn btn-danger'>
                    <i class='fa fa-times'></i>
                </span>
            </div>
        </li>
        `;

        return listItem;
    }
});