IIAS.Models.Dish = Backbone.Model.extend({
	url: '/api/dish',
	
	defaults: {
		name: "salad",
		is_salad: true,
		response: "Sure is!",
		flag: 0
	}
});