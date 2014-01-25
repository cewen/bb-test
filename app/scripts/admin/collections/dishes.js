IIAS.Collections.Dishes = Backbone.Collection.extend({
	model: IIAS.Models.Dish,
	url: '/api/admin/dishes'
});