IIAS.Views.Submit = Backbone.View.extend({
	className: 'submission-text',
	
	template: { 
		initial: _.template('Think "<%= name %>" is a salad?&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-xs">Nominate!</button>'),
		nominated: _.template('"<%= name %>" has been nominated for consideration as a salad. Thank You!')
	},
	
	render: function(){
		this.$el.html(this.template.initial(this.model.attributes));
		$('#user-submission').html(this.$el);
	},
	
	events: {
		'click button': 'submitNomination'
	},
	
	submitNomination: function(){
		self = this;
		
		this.model.save({ 'response': '', 'flag': 1 }, {
			success: function(model, response, options){
				self.saved();
			},
			error: function(model, xhr, options){
				self.saveError();
			}
		});
	},
	
	saved: function(){
		this.$el.html(this.template.nominated(this.model.attributes));
	},
	
	saveError: function(){
		this.$el.html('There was an error submitting your nomination. Please try again later.');
	}
});