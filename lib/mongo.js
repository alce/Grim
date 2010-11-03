var 
	mongoose = require('mongoose').Mongoose
, db = mongoose.connect('mongodb://localhost:27017/grim');

db.on('error', function(err, scope) {
	 console.log(err);
});

exports.mongoose = mongoose;
exports.db = db;