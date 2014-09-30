var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

var async = require('async')

module.exports = function(mongoose){

	_(mongoose.Document.prototype).extend({

		mongooseGet: mongoose.Document.prototype.get,

		get: function(path, type, options, callback) {
			if(!callback && typeof options === 'function'){
				callback = options;
				options = type;
			}

			if(!callback && typeof type === 'function'){
				callback = type;
				options = {};
			}	

			if(!callback){
				return this.mongooseGet.apply(this, arguments);
			}

			var camelizedGetPath = _('get_'+path).camelize();
			if(typeof this[camelizedGetPath] === 'function'){
				return this[camelizedGetPath](options, callback);
			}

			callback(null, this.mongooseGet.apply(this, arguments));
		},

		mongooseSet: mongoose.Document.prototype.set,

		set: function (path, val, type, options, callback) {
			if(!callback && typeof options === 'function'){
				callback = options;
				options = type;
			}

			if(!callback && typeof type === 'function'){
				callback = type;
				options = (typeof path !== 'string') ? val : {};
			}

			if(!callback && typeof val === 'function'){
				callback = val;
				options = {};
			}

			if(!callback){
				return this.mongooseSet.apply(this, arguments);
			}

			if(typeof path !== 'string'){
				var me = this;
				var keyOrder = !!options.orderedKeys;
				async[keyOrder ? 'eachSeries' : 'each'](options.orderedKeys || _(path).keys(), function(key, callback){
					me.set(key, path[key], options, callback);
				}, callback);
			}
			else{
				var camelizedSetPath = _('set_'+path).camelize();
				if(typeof this[camelizedSetPath] === 'function'){
					return this[camelizedSetPath](val, options, callback);
				}
				this.mongooseSet.apply(this, arguments);
				callback();
			}

		},

		do: function(path, options, callback) {
			var camelizedPath = _(path).camelize();
			if(typeof this[camelizedPath] === 'function'){
				return this[camelizedPath](options, callback);
			}
			else{
				callback('No action for ' + camelizedPath);
			}
		}

	});

};