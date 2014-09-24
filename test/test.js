var assert = require('assert');
global.mongoose = require('mongoose');
var _ = require('underscore');
var async = require('async');

require('./TestModel');

//require('./coverage/instrument/src/index')(mongoose);
require('../src/index')(mongoose);

describe('Testing the mongoose getset module.', function () {
	'use strict';

	var test;
	before(function (done) {
		test = mongoose.model('Test')({
			attr1: 'attr1'
		});
		done();
	});

	it('get from schema', function(done){
		assert.equal(test.attr1, 'attr1');
		done();
	});

	it('get from virtual', function(done){
		test.get('attr1', {}, function(err, result){
			if(err){
				return done(err);
			}
			assert.equal(result, 'cbAttr1');
			done();
		});
	});

	it('set from schema', function(done){
		test.attr1 = 'newAttr1';
		assert.equal(test.attr1, 'newAttr1');
		done();
	});

	it('set string path from virtual', function(done){
		test.set('attr1', 'cbAttr1AfterSet', {}, function(err){
			if(err){
				return done(err);
			}
			assert.equal(test.attr1, 'cbAttr1AfterSet');
			done();
		});
	});

	it('set obj path from virtual', function(done){
		test.set({'attr1': 'cbAttr1AfterSet2'}, function(err){
			if(err){
				return done(err);
			}
			assert.equal(test.attr1, 'cbAttr1AfterSet2');
			done();
		});
	});

});
