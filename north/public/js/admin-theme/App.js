var App = function () {
	"use strict";

	var chartColors = ['#ff6e14', '#d75200', '#b10c1b', '#5f060e','#ffaa75','#282a2e','#494e54','#6d737d','#c2c5c9'];
	
	return { init: init, chartColors: chartColors, debounce: debounce };

	function init () {

	}

	function debounce (func, wait, immediate) {
		var timeout, args, context, timestamp, result;
		return function() {
			context = this;
			args = arguments;
			timestamp = new Date();

			var later = function() {
				var last = (new Date()) - timestamp;

				if (last < wait) {
					timeout = setTimeout(later, wait - last);
				} else {
					timeout = null;
					if (!immediate) result = func.apply(context, args);
				}
			};

			var callNow = immediate && !timeout;

			if (!timeout) {
				timeout = setTimeout(later, wait);
			}

			if (callNow) result = func.apply(context, args);
			return result;
		};
	}
}();



var Nav = function () {
	
	return { init: init };
	
	function init () {

	}
	
	function navClick (e) {

	}
	
	function closeAll () {	
	}
}();


$(function () {
	App.init ();
});