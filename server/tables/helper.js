function index(obj, i) {
    return typeof obj[i] === 'undefined' ? {} : obj[i];
}

function get(obj, path) {
    let value = path.split('.').reduce(index, obj);
    if (value === true)  return 'Y';
    if (value === false) return '';
    if (value instanceof Date) return value.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
    if (typeof value === 'object') {
        if (value === null) return '';
        else if (Object.keys(value).length === 0) return '';
    }
    return value || '';
}

function fn(path) {
    if (!path) path = 'this.field';
    else path = `'${path}'`;

    this.get = get;
    
    let fn = new Function('client', `return get(client, ${path})`);
    return fn
}

module.exports = fn;