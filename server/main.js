import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

//define schema for the databases
DishInfo.schema = new SimpleSchema({
	dish_id: {type: Number},
	quantity: {type: Number, defaultValue: 1}
})

Orders.schema = new SimpleSchema({
	coupon_id: {type: Number, optional: true},
	member_id: {type: Number, optional: true},
	number_of_diner: {type: Number, defaultValue: 1},
	created_date: {type: Date},
	payable_amount: {type: Number},
	paying_method: {type: String},
	dishes: {type: [DishInfo.schema]}
});

});


//insert two sample data into the databases
