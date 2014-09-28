module.exports = function(mongoose){

	require('./Document')(mongoose);
	require('./Model')(mongoose);
	require('./Schema')(mongoose);

};