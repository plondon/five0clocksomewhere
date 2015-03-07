google.load('search', '1');
var FIVE0CLOCK = FIVE0CLOCK || {};

/*
TODO
change body to wrapper add parallax
change font
add information (from wikipedia?)

*/

FIVE0CLOCK = {
	init: function() {
		this.hours = 24;
		this.offset = 5;
		this.now = new Date();
		this.hour = this.now.getHours();
		this.offsetGMT = this.now.getTimezoneOffset()/60;
		this.date = this.hour + this.offset + this.offsetGMT - 1;

		this.results = TZ[this.date];

		this.CN = this.results[Math.floor(Math.random()*this.results.length)];
		this.prettyCN = this.CN.split('/')[1].replace('_', '');

		this.$location = $('.location');
		this.$time = $('.time');

		this.googleImage();
		this.getImage();
		this.setTime();

		setInterval( this.setTime.bind(this), 1000);
		return this;
	},
	googleImage: function() {
		this.imageSearch = new google.search.ImageSearch();

		// ADVANCED IMAGE SEARCH
		this.imageSearch.setRestriction(
			google.search.ImageSearch.RESTRICT_IMAGESIZE,
			google.search.ImageSearch.IMAGESIZE_EXTRA_LARGE);
		this.imageSearch.setRestriction(
			google.search.ImageSearch.RESTRICT_FILETYPE,
			google.search.ImageSearch.FILETYPE_JPG);

		this.imageSearch.setSearchCompleteCallback(this, this.setImage, null);
	},
	getImage: function() {
		this.imageSearch.execute(this.prettyCN);
	},
	setImage: function() {
		if ( !this.imageSearch.results.length ) { return; }
		var url = this.imageSearch.results[0].url;
		var $img = $("<img>");
		
		$img.attr('src', url);

		var self = this;
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
		if ( hour > 5 ) {
			FIVE0CLOCK.init();
		}
	},
	loading: function() {
		$('body').addClass('loading');
	},
	finishLoad: function() {
		$('body').addClass('finish-load');
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