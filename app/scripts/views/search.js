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
		
		// If we find a matching dish in the Collection, pass it to a Response View
		if(typeof dish === 'object'){
			response = dish.get('response');
			responseView = new IIAS.Views.Response({ model: dish });
			
			this.removeSubmitView();
		}
		// Else if a submission was made but no matching dish was found, send tempDish to a Response View
		else if(val.length){
			var regex = /^[\w\-\s]+$/;
			
			if(regex.test(val) == true){
				tempDish.set({ response: 'The jury\'s still out on that one.' });
				
				var submitView = new IIAS.Views.Submit({ model: tempDish });
				submitView.render();
			}
			else {
				tempDish.set({ response: 'That\'s not even a real dish is it? Try again.' });
				
				this.removeSubmitView();
			}
			
			responseView = new IIAS.Views.Response({ model: tempDish });
		}
		// Else if no text was entered, send a custom message along with tempDish to a Response View
		else {
			tempDish.set({ response: 'How about you enter a dish? Wise guy.' })
			responseView = new IIAS.Views.Response({ model: tempDish });
			
			this.removeSubmitView();
		}
		
		responseView.render();
	},
	
	removeSubmitView:function(){
		// TODO: Remove Submit view rather than manually emptying container with jQuery?
		$('#user-submission').empty();
	}
});