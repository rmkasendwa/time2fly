(function($) {
	$.fn.slider = function(options) {
		var linksContainer = this.find('.slider-controls .slide-links'),
			slidesContainer = this.find('.slides'),
			captionHeader = this.find('.slider-caption h2'),
			captionDetails = this.find('.slider-caption p'),
			loadSlide = function(slideConfig) {
				captionHeader.text(slideConfig.caption.header);
				captionDetails.text(slideConfig.caption.details);
			},
			links = $(),
			slides = $(),
			currentSlideIndex = 0,
			nextSlideTimeout;
		options.slides.forEach(function(slideConfig, index) {
			slides.push($('<div class="slide">').css('background-image', 'url(img/' + slideConfig.image + ')').hide()[0]);
			links.push($('<span class="slide-link">').on('click', function() {
				clearTimeout(nextSlideTimeout);
				if (currentSlideIndex !== index) {
					$(slides[currentSlideIndex]).fadeOut();
				}
				$(slides[index]).fadeIn();
				currentSlideIndex = index;
				links.removeClass('active');
				$(this).addClass('active');
				loadSlide(slideConfig);
				nextSlideTimeout = setTimeout(function() {
					$(links[(index + 1) % links.length]).trigger('click');
				}, 5000);
			})[0]);
		});
		linksContainer.html(links).css('margin-left', -((links.length * 30) - 10) / 2);
		slidesContainer.html(slides);
		this.find('.slider-controls .prev').on('click', function() {
			var index = currentSlideIndex - 1;
			(index >= 0) || (index = links.length - 1);
			$(links[index]).trigger('click');
		});
		this.find('.slider-controls .next').on('click', function() {
			$(links[(currentSlideIndex + 1) % links.length]).trigger('click');
		});
		$(links[0]).trigger('click');
	};
})(jQuery);
