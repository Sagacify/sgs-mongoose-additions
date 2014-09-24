var EmbeddedTestSchema = new mongoose.Schema({
	embeddedAttr: {
		type: String
	}
});

EmbeddedTestSchema.methods.getVirtualAttr = function(options, callback){
	callback(null, 'ok');
};

EmbeddedTestSchema.methods.getVirtualInstanceAttr = function(options, callback){
	mongoose.model('Test').findOne({}, callback);
};

var TestSchema = new mongoose.Schema({
	attr1: {
		type: String
	},
	attr2: {
		attr3: {
			type: String
		}
	},
	embeddedTests: [EmbeddedTestSchema]
});

TestSchema.methods.setAttr1 = function(val, options, next){
	this.attr1 = val;
	next();
};

TestSchema.methods.getAttr1 = function(options, callback){
	callback(null, 'cbAttr1');
};

TestSchema.statics.getAttr = function(options, callback){
	callback(null, 'attr');
};


var TestModel = mongoose.model('Test', TestSchema);