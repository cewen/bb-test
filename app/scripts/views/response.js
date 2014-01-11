IIAS.Views.Response = Backbone.View.extend({
	el: '#response',

	template: _.template(
		'<span class="'+
			'<% if(is_salad == 1){ %>'+
				'is-salad'+
			'<% }'+
			'else if(is_salad == 0){ %>'+
				'not-salad'+
			'<% } %>">'+
				'<%= response %>'+
		'</span>'
	),

	render: function(){
		this.$el.hide().html(this.template(this.model.attributes)).fadeIn();
	}
});