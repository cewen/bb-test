IIAS.Views.Search = Backbone.View.extend({
	el: '#search-form',
	template: _.template('<div class="form-group">'+
							'<input type="text" placeholder="Enter a dish" class="form-control">'+
						'</div>'),

	render: function(){
		this.$el.append(this.template);
	},
	
	events: {
		submit: 'getDish'
	},
	
	getDish: function(e){
		e.preventDefault();
		var val = this.$('input').val();
		
		// Get the dish that matches the user-inputted text
		var dish = this.collection.find(function(i){
			return i.get('name').toLowerCase() === val.toLowerCase();
		});
		
		// Form a temporary Dish just to pass to a Response view
		var tempDish = new IIAS.Models.Dish({
			name: val,
			response: '',
			is_salad: 2, // set to 2 temporarily so we know this is user-generated
			flag: 0
		});
		
		var responseView;
		
		if(typeof dish === 'object'){
			response = dish.get('response');
			responseView = new IIAS.Views.Response({ model: dish });
			
			// TODO: Remove Submit view rather than manually emptying container with jQuery?
			$('#user-submission').empty();
		}
		else if(val.length){
			tempDish.set({ response: 'The jury\'s still out on that one.' })
			responseView = new IIAS.Views.Response({ model: tempDish });
			
			var submitView = new IIAS.Views.Submit({ model: tempDish });
			submitView.render();
		}
		else {
			tempDish.set({ response: 'How about you enter a dish? Wise guy.' })
			responseView = new IIAS.Views.Response({ model: tempDish });
			
			// TODO: Remove Submit view rather than manually emptying container with jQuery?
			$('#user-submission').empty();
		}
		
		responseView.render();
	}
});