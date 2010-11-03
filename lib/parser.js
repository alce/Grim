/*globals module __dirname*/

require.paths.unshift(__dirname + '/../vendor');

var 
  fs = require('fs') 
,	xml = require('node-xml')
, NewsItem = require('./news_item').NewsItem
, logger = require('./log').Logger;

function Parser(body, sourceName) {

	var  self = this;

	Parser.init = function() {
		var xmlParser = self.setUpXMLParser(sourceName);
		xmlParser.parseString(body);
	};
	
	self.setUpXMLParser = function(sourceName) {
		return new xml.SaxParser(function(p) {
			
			var 
			  currentSource = sourceName
			, thisElement = false
			, newsItem;

			p.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {
				thisElement = elem.toLowerCase();
				if (thisElement == 'item') {
					 newsItem = new NewsItem({
							source: currentSource
						,	title: ' '
						, description: ' '
						, link: ' '
					});
				}
			});
			
			p.onCharacters(function(chars) {
				if (newsItem && newsItem[thisElement] !== undefined) {
					newsItem[thisElement] += chars;
				}
			});
			
			p.onCdata(function(cdata) {
				if (newsItem && newsItem[thisElement] !== undefined) {
					newsItem[thisElement] += cdata;
				}
			});
			
			p.onEndElementNS(function(elem, prefix, uri) {
				if (elem.toLowerCase() == 'item') {
					newsItem.create();
					newsItem = false;
				}
			});
			
			p.onError(function(msg) {
				logger.error('PRSR', 'Sorry, I give up ' + sourceName, msg);
			});
		});
	};

	Parser.init();
}

module.exports = Parser;