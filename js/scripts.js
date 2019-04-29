$(function() {
	var fragmentIncludes = $('fragment-include'),
		fragmentsToLoad = fragmentIncludes.length,
		fragmentLoadedCallback = function() {
			fragmentsToLoad--;
			if (fragmentsToLoad === 0) {
				var mainHeader = $('.main-header:not(.services-header)'),
					clockTime = $('.widget.clock'),
					temperature = $('.widget.temperature'),
					videoElement = $('video').on('contextmenu', function() {
						return false;
					})[0];
				if (videoElement && mainHeader.length > 0) {
					$(window).on('scroll', function() {
						if (this.scrollY + mainHeader[0].offsetHeight >= videoElement.offsetHeight) {
							mainHeader.addClass('opaque');
						} else {
							mainHeader.removeClass('opaque');
						}
					});
				}
				$('.menu-toggle').on('click', function() {
					$('body').toggleClass('menu-expanded');
				});
				if ($.fn.slider) {
					$('.slider').slider({
						slides: [{
							image: "kampala-city.jpg",
							caption: {
								header: "Kampala City",
								details: "Kampala is the Capital and largest city of Uganda. With over 2.5 million people, the city is built on seven hills and now spreading way beyond.  One thing you will note upon arrival is how green Kampala is but more so how it buzzes with life. Its bustling town is alive, filled with activities from business to cultural, with numerous Hotels that will fit every price range and provide an enjoyable stay while your explore Kampala, it reflects the heart of Africa."
							}
						}, {
							image: "kigali.jpg",
							caption: {
								header: "Kigali City",
								details: "Kigali is the capital and largest city of Rwanda. The city has been Rwanda's economic, cultural, and transport hub since it became capital at independence in 1962. Kigali is the cleanest city in Africa. The fact that it is so green and hilly adds to the aesthetic allure of the place. It is not surprising thus that Kigali is considered to be one of the most liveable cities in Africa."
							}
						}, {
							image: "nairobi.jpg",
							caption: {
								header: "Nairobi City",
								details: "Nairobi, popularly known as \"Green City in the Sun\" has over 3.5 million people and an amazing culture, which is unparalleled in any other city. The city is known for its sheer natural beauty that will take your breath away. ... Nairobi is a lively city, full of culture, historically rich, home to beautiful national parks and wildlife."
							}
						}, {
							image: "daressalaam.jpg",
							caption: {
								header: "Dar es salaam City",
								details: "Dar es Salaam is the largest and former capital city of Tanzania with an estimated population of over 5.3 million people it’s an economic capital of Tanzania. Located in a quiet bay off the Indian Ocean coast, the city has developed into an economic importance to become a prosperous centre of the entire East African region. Its bustling harbour is the main port in Tanzania."
							}
						}]
					});
				}
				var displayTime;
				setInterval(function() {
					var currentDateTime = new Date();
					currentDateTime = currentDateTime.toString("hh:mm") + ' ' + (currentDateTime.getHours() >= 12 ? "PM" : "AM");
					if (displayTime !== currentDateTime) {
						displayTime = currentDateTime;
						clockTime.text(currentDateTime);
					}
				}, 1000);
				var updateWeather = function() {
					$.get("https://api.openweathermap.org/data/2.5/weather?q=Kampala,ug&appid=6ca744f52c9249f074c38af65f845302&units=metric", function(weather) {
						temperature.html(weather.main.temp + "&#8451;").css('background-image', 'url(https://www.openweathermap.org/img/w/' + weather.weather[0].icon + '.png)');
					}, "jsonp");
					setTimeout(updateWeather, 1000 * 60);
				}
				updateWeather();
				$('body').removeAttr('style').scrollspy({
					target: '#main-menu',
					offset: 100
				});
				$('.nav-link').on('click', function(e) {
					e.preventDefault();
					var offset = 80;
					var target = this.hash;
					$('html, body').stop().animate({
						'scrollTop': $(target).offset().top - offset
					}, 500, 'swing', function() {
						// window.location.hash = target;
					});
				});
			}
		};
	fragmentIncludes.each(function() {
		var fragmentPlaceholder = $(this),
			fragmentBaseName = this.innerHTML;
		$.ajax({
			url: 'partials/' + fragmentBaseName,
			type: "GET",
			success: function(fragment) {
				if (fragmentPlaceholder.attr('class') !== undefined) {
					fragment = $(fragment).addClass(fragmentPlaceholder.attr('class'));
				}
				switch (fragmentBaseName) {
					case "site-css.html":
					case "site-js-libs.html":
						$('head').append(fragment);
						fragmentPlaceholder.remove();
						break;
					default:
						fragmentPlaceholder.after(fragment).remove();
				}
				fragmentLoadedCallback();
			}
		})
	});
});
