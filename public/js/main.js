google.load('search', '1');
var FIVE0CLOCK = FIVE0CLOCK || {};

FIVE0CLOCK = {
	init: function() {
		this.hours = 24;
		this.offsetGMT = 5;
		this.now = new Date();
		this.hour = (this.now.getHours()) % 24;
		this.date = this.hours - this.hour + this.offsetGMT;

		this.results = TZ[this.date];
		this.CN = this.results.splice(2,1)[0];
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
	setTime: function() {
		this.time = moment.tz(this.CN);
		this.time = moment(this.time).format('h:mm:ss a');

		this.reset();
		this.$location.text(this.prettyCN);
		this.$time.text(this.time);
	},
	getImage: function() {
		this.imageSearch.execute(this.prettyCN);
	},
	setImage: function() {
		var url = this.imageSearch.results[0].url;
		var $img = $("<img>");
		
		$img.attr('src', url);

		var self = this;
		$img.load(function() {
			setTimeout(function() {self.activate(); }, 1000);
			$('#wrapper').css({ 'background-image': 'url("' + url + '")'  });
		});
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