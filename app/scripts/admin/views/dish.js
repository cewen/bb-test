IIAS.Views.Dish =  Backbone.View.extend({
	tagName: 'li',
	model: IIAS.Models.Dish,
	
	template: _.template('<h4><%= name %></h4> <input type="text" class="form-control" value="<%= response %>"> <button class="btn btn-success">Salad</button><button class="btn btn-danger">Not Salad</button><button class="btn btn-warning btn-xs">Delete</button>'),
	
	render: function(){
		this.$el.html(this.template(this.model.attributes));
	},
	
	events: {
		'click .btn-success': 'approve',
		'click .btn-danger': 'deny',
		'click .btn-warning': 'destroy'
	},
	
	approve: function(){
		var self = this;
		var response = this.$el.find('input').val();

		this.model.save({flag: 0, is_salad: 1, response: response}, {
			success: function(){
				self.$el.remove();
			}
		});
	},
	
	deny: function(){
		var self = this;
		var response = this.$el.find('input').val();

		this.model.save({flag: 0, is_salad: 0, response: response}, {
			success: function(){
				self.$el.remove();
			}
		});
	},
	
	destroy: function(){
		var self = this;
		
		this.model.destroy({
			data: JSON.stringify(this.model.attributes),
			contentType: 'application/json',
			success: function(){
				self.$el.remove();
			}
		});
	}
});