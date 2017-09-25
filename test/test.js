/**
 * Created by ander on 2017-09-22.
 */

var UserTests = require('./user/user');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var testDb = require('../db').testURI;

mongoose.connect(testDb);

UserTests();