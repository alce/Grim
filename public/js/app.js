/*globals $*/

$(function() {	
	
	var options = {
    series: {
      lines: { show: true },
      points: { show: true }
    }
  };
	
	var foo = {label: "Grim", data:[ [1, 10], [2, 8], [3, 5],[4, 12], [5,15], [6,9] ]};
	var bar = {label: "Total", data:[ [1, 15], [2, 17], [3, 10] ]};
	
	$.plot($("#canvas"), [bar, foo], options);
});