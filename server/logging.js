var fs = require('fs');

var install_hook_to = function(obj) {
    
    if (obj.hook || obj.unhook) {
        throw new Error('Object already has properties hook and/or unhook');
    }
    
    obj.hook = function(_meth_name, _fn, _is_async) {
        var self = this,
            meth_ref;
        
        // Make sure method exists
        if (! (Object.prototype.toString.call(self[_meth_name]) === '[object Function]')) {
            throw new Error('Invalid method: ' + _meth_name);
        }

        // We should not hook a hook
        if (self.unhook.methods[_meth_name]) {
            throw new Error('Method already hooked: ' + _meth_name);
        }

        // Reference default method
        meth_ref = (self.unhook.methods[_meth_name] = self[_meth_name]);

        self[_meth_name] = function() {
            var args = Array.prototype.slice.call(arguments);

            // Our hook should take the same number of arguments 
            // as the original method so we must fill with undefined
            // optional args not provided in the call
            while (args.length < meth_ref.length) {
                args.push(undefined);
            }

            // Last argument is always original method call
            args.push(function() {
                var args = arguments;
                
                if (_is_async) {
                    process.nextTick(function() {
                        meth_ref.apply(self, args);
                    });
                } else {
                    meth_ref.apply(self, args);
                }
            });

            _fn.apply(self, args);
        };
    };
    
    obj.unhook = function(_meth_name) {
        var self = this,
            ref  = self.unhook.methods[_meth_name];

        if (ref) {
            self[_meth_name] = self.unhook.methods[_meth_name];
            delete self.unhook.methods[_meth_name];
        } else {
            throw new Error('Method not hooked: ' + _meth_name);
        }
    };

    obj.unhook.methods = {};
};

var stdout = process.stdout;

install_hook_to(stdout);

var directory = './logs';
if (!fs.existsSync(directory)) fs.mkdirSync(directory);
var fileName = 'log' + '-' + new Date().toLocaleString().replace(/\s/g, '-').replace(/:/g, '.') + '.txt';
var file = directory + '//' + fileName;
var logger = fs.createWriteStream(file, {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

stdout.hook('write', function(string, encoding, fd, write) {
    var useless = string.search(/(GET)\s\/(css|js|images|favicon|fontawesome)/g);
    if (useless == -1) {
        write(string);
        logger.write(string + '\n');
    }
})

process.on('uncaughtException', function(err) {
    console.log(err);
    setTimeout(function() {
        logger.end();
        process.exit(1);
    }, 3000);
});