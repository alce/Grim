var   assert = require('assert')
	, Headlines = require('../lib/headlines');
	
	
var h = {source:'frontera', title:'Some title'};
var g = {source:'proceso', title:'Some other title'};

// Headlines.memory.save([h,g]);
// assert.equal(Headlines.memory.count(), 2);
// assert.equal(Headlines.memory.popRandom().title, 'some headline');

Headlines.save([h,g]);

// assert.equal(Headlines.db.count(), 2);

//delete here

