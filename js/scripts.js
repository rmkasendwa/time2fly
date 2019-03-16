$(function() {
	var mainHeader = $('.main-header'),
		clockTime = $('.widget.clock'),
		videoElement = $('video').on('contextmenu', function() {
			return false;
		})[0];
	$(window).on('scroll', function() {
		if (this.scrollY + mainHeader[0].offsetHeight >= videoElement.offsetHeight) {
			mainHeader.addClass('opaque');
		} else {
			mainHeader.removeClass('opaque');
		}
	}).trigger('scroll');
	setInterval(function() {
		var currentDateTime = new Date();
		clockTime.text(currentDateTime.toString("hh:mm") + ' ' + (currentDateTime.getHours() >= 12 ? "PM" : "AM"));
	}, 1000);
});
