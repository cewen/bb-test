IIAS.Views.Dish =  Backbone.View.extend({
	model: IIAS.Models.Dish,
	template: _.template('<p><strong><%= name %>:</strong> <%= response %></p>'),
	render: function(){
		this.$el.html(this.template(this.model.attributes));
	}
});