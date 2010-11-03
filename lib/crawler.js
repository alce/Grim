/*globals module __dirname*/
            
var  
  http = require('http')
, url = require('url')
, Parser = require('./parser')
, sources = require('../config/sources')
, logger = require('./log').Logger
, isDevEnv = require('./utils').isDevEnv;


function Crawler() {
	
	var self = this;
	
	self.ACCEPT_HEADER = 'text/html,application/xhtml+xml,application/xml,application/atom+xml,application/rss+xml;q=0.9,*/*;q=0.8';
	self.USER_AGENT = 'Grim';

	self.crawl = function() {
		var _sources = isDevEnv() ? sources.localSources() : sources.sources();
		for (var i in _sources) {
			self.fetchHeadlines(_sources[i], true);
		}
	};
	
	//TODO: get rid of parse parameter. Always parse.
	
	self.fetchHeadlines = function(source, parse, callback) {
		logger.info('CRLR', 'Fetching ' + source.name);

		var 
			loc = url.parse(source.url)
		, client = http.createClient(loc.port || 80, loc.hostname)
		,	request = client.request('GET', loc.pathname + (loc.search ? loc.search : ''),
															{ 'host': loc.hostname 
														   ,'User-Agent': self.USER_AGENT
														   ,'Accept': self.ACCEPT_HEADER
														   ,'Accept-Charset': 'UTF-8,*'});
			
		request.end();
		
		client.on("error", function(err) {
			logger.error('CRLR', 'Problem fetching ' + loc.href, err);
		});
				
		request.on("response", function (response) {
			
			if (response.statusCode == '200') {
				var body = "";
	
				response.on("data", function(chunk) {
					body += chunk;
				});
				
				// TODO: handle encodings. 
				response.on("end", function() {
					logger.info('CRLR', 'Got ' + source.name);
					if (parse) return new Parser(body, source.name);
					callback(body);
				});
			} else {
				logger.error('CRLR', 'Unable to fetch ' + loc.href, response.statusCode);
			}
		});
	};
}

module.exports = Crawler;