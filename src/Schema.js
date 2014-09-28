var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

var async = require('async')

module.exports = function(mongoose){

	_(mongoose.Schema.prototype).extend({

		isRef: function(path){
			var pathSchema = this.path(path);
			return pathSchema && pathSchema.instance === 'ObjectID';
		},

		isRefArray: function(path){
			var pathSchema = this.path(path);
			return pathSchema && pathSchema.caster && pathSchema.caster.instance === 'ObjectID';
		}

	});

};