var FIVE0CLOCK = FIVE0CLOCK || {};

/*
TODO
FIGURE OUT TIME ISSUE
GET NICER IMAGES

add parallax
add place info
add google maps
*/

FIVE0CLOCK = {
	init: function() {
		this.now = new Date();
		this.hour = this.now.getHours();
		this.offsetTime = 17 - this.hour;
		this.offsetGMT = this.now.getTimezoneOffset()/60;
		this.date = 12 + this.offsetTime + 1 + 4 - this.offsetGMT;

		this.results = TZ[this.date];

		this.CN = this.results[Math.floor(Math.random()*this.results.length)];
		this.prettyCN = this.CN.split('/')[1].replace('_', '');

		this.$location = $('.location');
		this.$time = $('.time');

		this.getImage();
		this.setTime();

		setInterval( this.setTime.bind(this), 1000);
		return this;
	},
	getImage: function() {
		var req = $.get('/search/' + this.prettyCN);

		req.done(function (d) {
			FIVE0CLOCK.images = JSON.parse(d).bossresponse.images.results;

			FIVE0CLOCK.images.sort(function(a, b) {
				return parseInt(a.size) - parseInt(b.size);
			});

			FIVE0CLOCK.setImage();
		});
	},
	setImage: function() {
		var url = this.images.pop().clickurl;
		var $img = $("<img>");
		
		$img.attr('src', url);

		var self = this;
		$img.error(function() {
			self.init();
		});
		$img.load(function() {
			setTimeout(function() {self.finishLoad(); }, 0);
			setTimeout(function() {self.activate(); }, 2000);
			$('#wrapper').css({ 'background-image': 'url("' + url + '")'  });
		});
	},
	setTime: function() {
		this.time = moment.tz(this.CN);
		this.time = moment(this.time).format('h:mm:ss a');

		this.reset();
		this.$time.text(this.time);
		this.$location.text(this.prettyCN);
	},
	reset: function() {
		var hour = parseInt(this.time[0]);
		// if ( hour > 5 ) {
		// 	FIVE0CLOCK.init();
		// }
	},
	loading: function() {
		$('body').addClass('loading');
	},
	finishLoad: function() {
		$('body').addClass('finish-loading');
	},
	activate: function() {
		$('body').removeClass('loading');
		$('body').addClass('active');
	}
};

$(document).ready(function() {
	$('body').imagesLoaded(function() {
		FIVE0CLOCK.init();
	});
});