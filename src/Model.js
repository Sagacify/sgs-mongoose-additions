var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

var async = require('async')

module.exports = function(mongoose){

	_(mongoose.Model).extend({

		get: function(path, options, callback) {
			var camelizedGetPath = _('get_'+path).camelize();
			if(typeof this[camelizedGetPath] === 'function'){
				return this[camelizedGetPath](options, callback);
			}

			var camelizedPath = _(path).camelize();
			if(typeof this[camelizedPath] === 'function'){
				return this[camelizedPath](options, callback);
			}

			callback('No path ' + path + ' in model');
		}

	});

};