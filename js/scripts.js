$(function() {
	var fragmentIncludes = $('fragment-include'),
		fragmentsToLoad = fragmentIncludes.length,
		fragmentLoadedCallback = function() {
			fragmentsToLoad--;
			if (fragmentsToLoad === 0) {
				var mainHeader = $('.main-header'),
					clockTime = $('.widget.clock'),
					temperature = $('.widget.temperature'),
					videoElement = $('video').on('contextmenu', function() {
						return false;
					})[0];
				if (videoElement) {
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
				$('body').removeAttr('style');
			}
		};
	fragmentIncludes.each(function() {
		var fragmentPlaceholder = $(this),
			fragmentBaseName = this.innerHTML;
		$.ajax({
			url: 'partials/' + fragmentBaseName,
			type: "GET",
			success: function(fragment) {
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
