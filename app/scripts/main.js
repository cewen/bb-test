/*global IIAS, $*/


window.IIAS = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	
	init: function () {
		'use strict';

		 var salad = new this.Models.Dish();
		 var steak = new this.Models.Dish({
			 name: "Steak",
			 isSalad: false,
			 response: "No a steak isn't a salad, ya dummy."
		 });

		 var dishes = new this.Collections.Dishes();
		 
		 dishes.push(salad);
		 dishes.push(steak);

		 new this.Views.Dishes({collection: dishes}).render();
	}
};

$(document).ready(function () {
	'use strict';
	
	IIAS.init();
});
