/*globals task desc namespace process*/

/*
	Environments
	
	development: 
		- server restarts on code changes
		- local feed servers are hit
		- logger writes to stdout and db
		- feeds are fetched with frequency defined by _devCrawl (low value)
		
	production:
		- server does not restart on code changes
		- remote servers are hit
		- logger writes to db only
		- feeds are fetched with frequency defined by _prodCrawl (high value)
		
	local_production: (or any other different prom development or production)
		- server does not restart on code changes
		- remote servers are hit
		- logger writes to stdout and db
		- feeds are fetched with frequency defined by _prodCrawl (high value)
*/

require.paths.unshift('vendor');

var
	sys = require('sys')
, spawn = require('child_process').spawn;

desc("Start development server");
task("default", [], function() {
	var s = spawn('node', ['dev_server.js']);
	s.stdout.on('data', function(data) {
		sys.print(data);
	});
});

namespace("server", function() {	
	desc("Start server in production environment");
	task("prod", [], function() {
		process.env.NODE_ENV = 'production';
		var s = spawn('node', ['server.js']);
		s.stdout.on('data', function(data) {
			sys.print(data);
		});
	});

	desc("Start server in local production environment");
	task("lprod", [], function() {
		process.env.NODE_ENV = 'local_production';
		var s = spawn('node', ['server.js']);
		s.stdout.on('data', function(data) {
			sys.print(data);
		});
	});
	
	desc("Start test feed servers. Call with paramter '1' to start only server A");
	task("feeds", [], function() {
		var n = arguments[0] || 2;
		var s = spawn('node', ['tests/server/server.js', n]);
		s.stdout.on('data', function(data) {
			sys.print(data);
		});
	});
});

namespace("db", function() {
	var 
		Db = require('mongodb').Db
	, Conn = require('mongodb').Connection
	, Server = require('mongodb').Server
	, db = new Db('grim', new Server('localhost', Conn.DEFAULT_PORT, {}));
	
	desc("Drops the database database");
	task("drop", [], function() {
		db.open(function() {
			db.dropDatabase(function(err, res) {
				db.close();
			});
		});
	});
	
	desc("Show collection counts");
	task("counts", [], function() {
		db.open(function() {
			var counts = '';
			
			db.collection('newsitems', function(err, items) {
				items.count(function(err, count) {
					counts += 'News Items: ' + count;
				});
			});
			
			db.collection('logs', function(err, logs){
				logs.count(function(err, count) {
					counts += ' Logs: ' + count;
					sys.puts(counts);
					db.close();
				});
			});
		});
	});
});
