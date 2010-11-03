/*globals exports process __dirname*/

require.paths.unshift('../vendor');

var jade = require('jade');

exports.isDevEnv = function() {
	return process.env.NODE_ENV == 'development';
};
var isDevEnv = exports.isDevEnv;

/* jQuery.trim() */
exports.trim = function(text) {
	return (text || "").replace( /^(\s|\u00A0)+|(\s|\u00A0)+$/g, "" );
};

exports.sanitize = function(html) {
	return (html || "").replace(/(<([^>]+)>)/ig,"");
};

exports.render = function(status, filename, opts, response) {
	var 
		templatePath = __dirname + '/../views'
	, template = templatePath + '/' + filename + '.jade';

	function handleError(err, callback) {
		if (err) {
			if (isDevEnv()) {
				response.writeHead(status, {'Content-Type':'text/plain'});
				return response.end(err.message);
			}
			throw err; 
		}
		callback();
	}

	jade.renderFile(template, opts, function(err, partial) {
		handleError(err, function() {
			opts.locals = opts.locals || {};
			opts.locals.body = partial;		

			jade.renderFile(templatePath + '/layout.jade', opts, function(err, html) {
				handleError(err, function() {
					response.writeHead(status, {'Content-Type':'text/html;charset=UTF-8'});
					response.end(html);
				});
			});
		});
	});
};
