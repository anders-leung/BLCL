/**
 * Created by ander on 2017-09-22.
 */
var UserSetup = require('./setup');
var User = require('../../models/User');
var UserService = require('../../modules/user');

var assert = require('chai').assert;

function Test() {

    describe('Create User', function() {

        beforeEach(function(done) {
            UserSetup.before(done);
        });

        after(function(done) {
            UserSetup.after(done);
        });

        describe('Create a user', function() {
            it('should create a user with given parameters', function(done) {
                var user = {
                    email: 'test@email.com',
                    password: 'test',
                    role: 'Administrator',
                    initials: 'TT'
                };

                UserService.createUser(user, function(err) {
                    assert.isNull(err, 'should not err');
                    User.find({ initials : 'TT' }, function(err, user) {
                        assert.isNull(err, 'should not err');
                        assert.equal(user.email, 'test@email.com');
                        assert.equal(user.password, 'test');
                        assert.equal(user.role, 'Administrator');
                        assert.equal(user.initials, 'TT');
                        done();
                    })
                })
            })
        })
    })
}

module.exports = Test;