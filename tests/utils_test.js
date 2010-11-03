var assert = require('assert'),
	 trim = require('../lib/utils').trim,
	 sanitize = require('../lib/utils').sanitize;
	
	
assert.equal(trim('  a  '), 'a');


// assert.equal(sanitize('<p>text</p>'), 'text');
assert.equal(sanitize(' <div id="div">  <p class="text"> text </p> </div>'), 'text');