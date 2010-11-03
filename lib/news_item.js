/*globals process exports module __dirname*/


// TODO Organize requires. either use __dirname or not in all files
var 
  sys = require('sys')
, mongoose = require(__dirname + '/mongo').mongoose
, db = require(__dirname + '/mongo').db
, logger = require(__dirname + '/log').Logger
, stems = require(__dirname + '/../config/stems').stems()
, createHmac = require('crypto').createHmac
, utils = require(__dirname + '/utils');

mongoose.model('NewsItem', {

	properties: ['created_at' , 'source', 'title', 'isGrim', 'link',
							 'description', 'random', 'hash' , 'popped'],

	indexes: ['popped', 
						// [{ hash: 1 }, {unique: true}],  
						[{isGrim: 1, random: 1}]], 
						
	static: {
		
		pop: function(callback) {
			var found = function(doc) {
				doc.popped = true;
				doc.save(function() {
					logger.info('NEWS', '<< '+ doc.to_s); 
					callback(doc);
				});
			},
			
			rand = Math.random();
			
			this.find({popped: false, random: {$gte: rand}}).first(function(doc) {
				if (doc) {
					found(doc);
				} else {
					exports.NewsItem.find({popped: false, random: {$lte: rand}}).first(function(doc) {
						if (doc) {
							found(doc);
						}	else {
							callback(null);
						}					
					});
				}
			});
		},
		
		allCount: function(callback) {
			this.count({popped: true}, function(n) {
				callback(n);
			});
		},
		
		grimCount: function(callback) {
			this.count({popped: true, isGrim: true}, function(n) {
				callback(n);
			});
		}
	
	},

	methods: {	
		
		create: function() {
			this.created_at = new Date();
			this.identify();
			this.hash = createHmac('md5').update(this.title).digest('hex').substring(0,10);
			this.random = Math.random();
			this.popped = false;
			this.save();
			logger.info('NEWS','>> '+ this.to_s); //TODO log only sucessful saves
		},
		
		identify: function() {
			for (var i in stems) {
				if (this.title.toLowerCase().indexOf(stems[i]) >= 0) {
					this.isGrim = true;
					break;
				} else if (this.description.toLowerCase().indexOf(stems[i]) >= 0) {
					this.isGrim = true;
					break;
				}
			}
		}
	},
	
	setters: {
		title: function(val) {
			return utils.trim(utils.sanitize(val));
		},
		
		description: function(val) {
			return utils.trim(utils.sanitize(val)).substring(0,250);
		},
		
		link: function(val) {
			return utils.trim(val);
		}
	},

	getters: {
		to_s: function() {
			return this.source + ' |'+ this.logGrim + this.title; 
		},
		
		logGrim: function() {
			return this.isGrim === true ? '*' : '-';
		},
		
		toMessage: function() {
			return {  source: this.source
							, isGrim: this.isGrim
							, title: this.title
							, link: this.link
							, description: this.description + '...'};
		}
	}
});



exports.NewsItem = db.model('NewsItem');