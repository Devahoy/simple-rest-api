var mongojs = require('mongojs');

var databaseUrl = 'devahoy_mongojs';
var collections = ['users', 'clubs'];

var connect = mongojs(databaseUrl, collections);

module.exports = {
	connect: connect
};