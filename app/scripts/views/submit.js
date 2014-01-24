IIAS.Views.Submit = Backbone.View.extend({
	className: 'submission-text',
	
	template: _.template('Think "<%= name %>" is a salad?&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-xs">Nominate!</button>'),
	
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		$('#user-submission').html(this.$el);
	},
	
	events: {
		'click button': 'submitNomination'
	},
	
	submitNomination: function(){
		this.model.set({ 'response': '', 'flag': 1 });
		this.model.save();
	}
});