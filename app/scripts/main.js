/*global IIAS, $*/


window.IIAS = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	
	init: function () {
		'use strict';

		 var dishes = new this.Collections.Dishes();

		 dishes.fetch({
		 	success: function(collection){
		 		console.log('Dishes retrieved successfully')
				//new IIAS.Views.Dishes({collection: dishes}).render();
				new IIAS.Views.Search({collection: dishes}).render();
		 	},
			error: function(){
				console.log('Failed to retrieve dishes')
			}
		 });

		 
	}
};

$(document).ready(function () {
	'use strict';
	
	IIAS.init();
});
