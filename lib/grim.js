/*globals module process __dirname*/

require.paths.unshift(__dirname+'/../vendor');

var 
  http = require('http')
, sys = require('sys')
, url = require('url')
, Faye = require('faye')
, Crawler = require('./crawler')
, NewsItem = require('./news_item').NewsItem
, render = require('./utils').render
, isDevEnv = require('./utils').isDevEnv
,	sources = require('../config/sources').sources()
, logger = require('./log').Logger;

if (process.env.NODE_ENV == 'production') {
	process.on('uncaughtException' , function(err) {
		logger.error('GRIM', 'Uncaught Exception', err);
	});
}

function Grim() {
	var  
		 self  = this
	, _port = 8888
	, _timeout = 45
	, _mount = '/comet'
	, _channel = '/grim'
	, _devCrawlInterval = 20000
	, _prodCrawlInterval = 999999999999
	, _publishInterval = 5000
	, _publish = true
	, _authToken = 'RDWAr0o[MiJjBN0kqHJ/ojwfhWeScG';

	self.init = function() {
		self.crawler = self.startCrawler();
		self.comet = self.startCometServer();
		self.server = self.startHTTPServer();
		self.client = self.prepareCometClient();
		self.comet.attach(self.server);
		self.server.listen(_port);
		logger.info('GRIM', 'Serving up some violence on port '+_port+' '+process.env.NODE_ENV);
	};

	self.startCrawler = function() {
		self.crawler = new Crawler();
		self.crawler.crawl();
		setInterval(self.crawler.crawl, isDevEnv() ? _devCrawlInterval : _prodCrawlInterval); 
	};

	self.startCometServer = function() {
		var serverAuth = {
			incoming : function(msg, callback) {
				if (msg.channel.match(/^\/meta/)) return callback(msg);
				if (_authToken !== (msg.ext && msg.ext.token)) msg.error = "nope!";
				callback(msg);
			}
		},
		
		f = new Faye.NodeAdapter({mount: _mount, timeout: _timeout});
		f.addExtension(serverAuth);
		return f;
	};
	
	self.prepareCometClient = function() {
		var clientAuth = {
			outgoing: function(msg, callback) {
				msg.ext = {};
				msg.ext.token = _authToken;
				callback(msg);
			}
		},
		
		c = self.comet.getClient();
		c.addExtension(clientAuth);
		return c;
	};

	self.startHTTPServer = function() {
		return http.createServer(function(request, response) {
			request.on('end', function() {
			
				var uri = url.parse(request.url, true);
				
				if (request.method == 'GET' || request.method == 'HEAD') {
					
					switch (uri.pathname) {
						case '/':
							var locals = {
										title: ""
									 ,sources: sources
									};
						
							NewsItem.grimCount(function(grim) {
								locals.grimCount = grim;
								NewsItem.allCount(function(all) {
									locals.allCount = all;
									render(200,'index', {locals: locals}, response);
								});
							});
						break;						
						case '/config':
							response.writeHead(200, {'Content-Type':'application/json'});
							response.end(JSON.stringify({
								 port: _port
							 , mount: _mount
							 , channel: _channel
							}));
						break;
						case '/favicon.ico':
							// TODO: Maybe render the favicon from nginx
							console.log('Requested Favicon');
						break;
						default:
							render(404 ,'404', {locals: {title: "404"}}, response);
					}
				} else {
					render(404 ,'404', {locals: {title: "404"}}, response);
				}
			});
		});
	};
	
	var buildMessage = function(nI) {
		var message = nI.toMessage;
		return message;
	};

	self.publish = function() {
		NewsItem.pop(function(nI) {
			if (nI) {
				self.client.publish(_channel, buildMessage(nI));
			} else {
				logger.info("GRIM", "No more items to publish");
			}
		});
	};

	self.init();
	if (_publish) setInterval(self.publish, _publishInterval);
}

module.exports = Grim;