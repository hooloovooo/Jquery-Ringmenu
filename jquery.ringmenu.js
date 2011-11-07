/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

	// Create the defaults once
	var pluginName = 'ringmenu',
		defaults = {
			mouseenter: function(li_element) {}, //Hover effect on items in menu 
			mouseout: function(li_element) {}, //Hover effect on items in menu
			items: [], // Items in a array containing { icon: <img_url>, action: <click_callback> }

		};

	// The actual plugin constructor
	function Plugin( element, options ) {
		var self = this;

		this.element = element;
		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();

		$(this.element).bind("click", function() {
			self.animate();
			$(".rm_container").show();
		});
	}

	Plugin.prototype.init = function () {
		// Place initialization logic here
		// You already have access to the DOM element and
		// the options via the instance, e.g. this.element
		// and this.options
		var self = this;

		var cont = $("<ul>", { "class": "rm_container" });
		$.each(this.options.items, function(i, item) {
			var li = $("<li>", { "class": "rm_item" });
			var img = $("<img>", { "src": item.icon }).appendTo(li);
			
			//Bind events to buttons
			li.bind("click", item.action);
			li.bind("mouseenter", function() { self.options.mouseenter(li) });
			li.bind("mouseleave", function() { self.options.mouseout(li) });

			li.appendTo(cont);
		});

		cont.appendTo($("body"));

	};

	Plugin.prototype.animate = function() {
		//x = cx + r * cos(a)
		//y = cy + r * sin(a)
		var item_count = $(".rm_container").children().length;
		var origin = $(this.element).offset();

		//If visible, he hide it
		if($(".rm_container").is(":visible")) {
			$(".rm_container").children().animate({
				top: origin.top,
				left: origin.left
			}, 200, function() {
				$(".rm_container").hide();
			});
		}
		//Else we show it!
		else {
			$(".rm_container").children().css({
				top: origin.top,
				left: origin.left
			});

			$(".rm_container").children().each(function(i, item) {
				var angle_x = Math.PI*2/item_count*(i+1);
				var angle_y = Math.PI*2/item_count*(i+1);

				$(item).animate({
					left: origin.left + 200 * Math.cos(angle_x),
					top: origin.top + 200 * Math.sin(angle_y)
				}, 200);
			});
		}
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
				new Plugin( this, options ));
			}
		});
	}

})( jQuery, window, document );