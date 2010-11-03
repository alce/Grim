/*globals __dirname process*/
var 
  http = require('http')
, url = require('url')
, fs = require('fs')
, sys = require('sys');

var serverA = http.createServer(function(req, res) {
	req.on('end', function() {
		var loc = url.parse(req.url);
		
		switch(loc.pathname) {
			case '/favicon.ico':
				res.writeHead(400);
				res.end();
				break;
			case '/':
				res.writeHead(200, {'Content-Type':'text/html'});
				fs.readdir(__dirname +'/views', function(err, files) {
					var html = "<h3>Feeds</h3>\n<a href='http://localhost:1235'>B</a><br/>";
					files.forEach(function(file) {
						html += "<a href='/"+file+"'>"+file+"</a>\n<br/>";
					});
					res.end(html);
				});
				break;
			default:
				var filename = __dirname + '/views' + loc.pathname;
				res.writeHead(200, {'Content-Type': 'application/xml'});
				fs.readFile(filename, 'utf-8', function(err, xml) {
					if (err) throw err;
					res.end(xml);
			});
			sys.log('A >> ' + loc.pathname);
		}
	});
});

var serverB = http.createServer(function(req, res) {
	req.on('end', function() {
		var loc = url.parse(req.url);
		
		switch(loc.pathname) {
			case '/favicon.ico':
				res.writeHead(400);
				res.end();
				break;
			case '/':
				res.writeHead(200, {'Content-Type':'text/html'});
				fs.readdir(__dirname +'/views', function(err, files) {
					var html = "<h3>Feeds</h3>\n<a href='http://localhost:1234'>A</a><br/>";
					files.forEach(function(file) {
						html += "<a href='/"+file+"'>"+file+"</a>\n<br/>";
					});
					res.end(html);
				});
				break;
			default:
				var filename = __dirname + '/views' + loc.pathname;
				res.writeHead(302, {'Content-Type': 'application/xml'});
				fs.readFile(filename, 'utf-8', function(err, xml) {
					if (err) throw err;
					res.end(xml);
			});
			sys.log('B >> ' + loc.pathname);
		}
	});
});

serverA.listen(1234);
sys.log('Server A listening on port 1234');

if (process.ARGV[2] == '2') {
	serverB.listen(1235);
	sys.log('Server B listening on port 1235');
}






