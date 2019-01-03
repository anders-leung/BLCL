const fs = require('fs');
const promisify = require('util').promisify;

const readdir = promisify(fs.readdir);

const to = require('../../helpers/to');

module.exports = {
    get: async (name) => {
        let [err, files] = await to(readdir(global.templateDirectory));
        
        if (name) {
            files = files.filter(file => file === name);
        }

        return [err, files];
    }
}