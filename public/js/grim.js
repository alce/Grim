/*globals $ Faye */

function Grim() {
	
	var self = this;
	
	this.init = function() {
		self.grimCount = parseInt($('#grim_count').html(), 10);
		self.subscribe();
		self.headline = $('h1');
		self.percentage = $('#percentage');
		self.grimCountDiv = $('#grim_count');
		self.totalCountDiv = $('#total');
		
		self.grimCount = parseInt(self.grimCountDiv.html(), 10);
		self.totalCount = parseInt(self.totalCountDiv.html(), 10);
	
		self.percentage = $('#percentage');
		self.source = $('#source');
	};
	
	this.subscribe = function() {
		$.getJSON("/config", function(c, status) {
			var url = 'http://'+window.location.hostname+':'+c.port+c.mount;
			self.client = new Faye.Client(url , {timeout: 120});	
			
			self.client.subscribe(c.channel, function (msg) {
				self.updateUI(msg);
			});
		});
	};
	
	this.updateUI = function(msg) {
		
		self.totalCount++;
		
		if (msg.isGrim) {
			self.headline.css('color', 'red');
			// $(self.grimCountDiv).effect( "highlight", {color:"#669966"}, 3000 );
      
			self.grimCount++;
		} else {
			self.headline.css('color', 'green');
		}
		
		self.source.html(msg.source);
		self.headline.html(msg.title);
		
		self.totalCountDiv.html(self.totalCount);
		self.percentage.html(self.updatePercentage);
		self.grimCountDiv.html(self.grimCount);				
	};
	
	this.updatePercentage = function() {
		var val = self.grimCount / self.totalCount;
		$('#percentage').html((val * 100).toFixed(2));
	};
	
	this.init();
}

var grim;

$(function() {
	grim = new Grim();
	grim.updatePercentage();
});
