IIAS.Views.Response = Backbone.View.extend({
	el: '#response',

	render: function(){
		this.$el.hide().html(this.model.get('response')).fadeIn();
	},
	
	addSubmissionForm: function(name){
		var newDish = new IIAS.Models.Dish({
			name: name,
			is_salad: false,
			response: '',
			flag: 1
		});
		console.log(this.templateSubmit(newDish.attributes))
		console.log(this.$el.find('h2'))
		this.$el.find('h2').append(this.templateSubmit(newDish.attributes));
	}
});