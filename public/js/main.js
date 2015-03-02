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
		this.CN = this.results.splice(0,1)[0];
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
		var time = moment.tz(this.CN);
		    time = moment(time).format('h:mm:ss a');

		this.$location.text(this.prettyCN);
		this.$time.text(time);
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
			setTimeout(function() {self.activate(); }, 2000);
			$('#wrapper').css({ 'background-image': 'url(' + url + ')'  });
		});
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
		FIVE0CLOCK.init().loading();
	});
});