IIAS.Views.Dishes = Backbone.View.extend({
	el: '#bb-unit',
	collection: IIAS.Collections.Dishes,
	render: function(){
		this.collection.forEach(this.addOne, this)
	},
	addOne: function(model){
		var dishView = new IIAS.Views.Dish({ model: model });
		dishView.render();
		this.$el.append(dishView.el);
	}
});