var FIVE0CLOCK = [];

var max = timeZones.length;
var count = 0;

window.timeZones.forEach(function(tz) {
	var url = "http://api.timezonedb.com/?zone="+tz+"&format=json&key=MHOS2162RLOY";

	var req = $.ajax({
		url: url,
		dataType: 'jsonp'
	});

	req.success(function(d) {
		var time = d.timestamp;
		var date = new Date(time*1000);
		var hour = date.getHours() + 5;

		if ( hour === 17 ) {
			FIVE0CLOCK.push(d.zoneName);
			$('body').append("<div>"+d.zoneName+"</div>");
		}

		count+=1
		console.log(count)
	});

	console.log(max)
	if ( count === max - 2 ) {
		$('body').append("<div>:)</div>");
	}
});