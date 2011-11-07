$(function() {
	$("#trigger").ringmenu({
		items: [
			{
				icon: "img/Foobar2000.png",
				action: function() {
					console.log("tjena");
				}
			},
			{
				icon: "img/Gimp.png",
				action: function() {
					console.log("tjena");
				}
			},
			{
				icon: "img/GOM.png",
				action: function() {
					console.log("tjena");
				}
			},
			{
				icon: "img/Headphones.png",
				action: function() {
					console.log("tjena");
				}
			},
			{
				icon: "img/iTunes.png",
				action: function() {
					console.log("tjena");
				}
			},
		],
		mouseenter: function(li) {
			li.children("img").animate({ "opacity": "0.6" }, 100)
			console.log("mouseenter")
		},
		mouseout: function(li) {
			li.children("img").animate({ "opacity": "1" }, 100)
			console.log("mouseleave")
		}
	});
});