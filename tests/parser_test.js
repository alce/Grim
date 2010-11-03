/*globals process*/

var Parser = require('../lib/parser')
	, http = require('http')
	, source = process.argv[2];
	
function parse_feed(source) {
	var path = '/' + source;
	var client = http.createClient(1234, 'localhost');
	var request = client.request('GET', path, {'host' : 'localhost'});
	request.on("response", function (response) {
		var body = "";
	
		response.on("data", function(chunk) {
			body += chunk;
		});
	
		// need to handle encodings here maybe
		response.on("end", function() {
			return  new Parser(body, source);
		});
	});
	
	request.end();
}

parse_feed(source);
	
			