var users = require('./users');
var app = require('express')();
var bodyParser = require('body-parser');

var mongojs = require('./db');
var db = mongojs.connect;

var port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function (req, res) {

	db.users.count(function(err, result) {
		if (result <= 0) {
			db.users.insert(users.findAll(), function(err, docs) {
				// insert new data.
			});
		} 
		res.send('<h1>Hello Node.js</h1>');
	});

});

app.get('/user', function (req, res) {
	db.users.find(function(err, docs) {
		res.json(docs);
	});
});

app.get('/user/:id', function (req, res) {
	var id = parseInt(req.params.id);

	db.users.findOne({id: id}, function(err, docs) {
		res.json(docs);
	});
});

app.post('/newuser', function (req, res) {
	var json = req.body;

	db.users.insert(json, function(err, docs) {
		res.send('Add new ' + docs.name + ' Completed!');
	});

});

app.listen(port, function() {
	console.log('Starting node.js on port ' + port);
});