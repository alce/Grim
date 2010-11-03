/*globals __dirname process exports*/

var 
  sys = require('sys')
, mongoose = require(__dirname + '/mongo').mongoose
, db = require(__dirname + '/mongo').db;

mongoose.model('Log', {
	properties: ['created_at', 'level', 'klass', 'message', 'trace'],
	indexes: ['category', 'level'],

	static : {

		log: function(level, klass, message, trace) {
			if(!(process.env.NODE_ENV == 'production')) {
				sys.puts("["+klass+"] "+ message + (trace ? " ("+trace+ ")" : '') );
			}
			
			var item = new this.constructor();
			item.level = level;
			item.klass = klass;
			item.message = message;
			item.trace = trace;
			item.created_at = new Date();
			item.save();
		},

		info: function(klass, message, trace) {
			return this.log('info', klass, message, trace);
		},

		debug: function(klass, message, trace) {
			return this.log('debug', klass, message, trace);
		},

		error: function(klass, message, trace) {
			return this.log('error', klass, message, trace);
		}
	}
});

exports.Logger = db.model('Log');