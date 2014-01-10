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
			is_salad: 0,
			flag: 0
		});
		
		var responseView;
		
		if(typeof dish === 'object'){
			response = dish.get('response');
			responseView = new IIAS.Views.Response({ model: dish });
		}
		else if(val.length){
			tempDish.set({ response: 'The jury\'s still out on that one.' })
			responseView = new IIAS.Views.Response({ model: tempDish });
			
			//var submitView = new IIAS.Views.Submit({  });
		}
		else {
			tempDish.set({ response: 'How about you enter a dish? Wise guy.' })
			responseView = new IIAS.Views.Response({ model: tempDish });
		}
		
		responseView.render();
	},
	
	// addSubmissionForm: function(name){
// 		var newDish = new IIAS.Models.Dish({
// 			name: name,
// 			is_salad: false,
// 			response: '',
// 			flag: 1
// 		});
// 	//	console.log(this.templateSubmit(newDish.attributes))
// 		console.log(this.$el.find('h2'))
// 		this.$el.find('h2').append(this.templateSubmit(newDish.attributes));
// 	}
});