import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Order, Member, Coupon, Menu } from '../api/database.js';

Meteor.startup(() => {
  // code to run on server at startup
  Menu.remove({});
  Member.remove({});
  
  const dummyMenu1 = {
  	_id : new Meteor.Collection.ObjectID(),
  	dish_name : "Fried Rice", 
  	dish_category : "Main", 
  	dish_price : 9.5, 
  	dish_image : "http://xinwang.com.sg/wp-content/uploads/2014/07/Xin-Wang-0006.jpg",
  };
  const dummyMenu2 = { 
  	_id : new Meteor.Collection.ObjectID(),
  	dish_name : "Salmon Spaghetti", 
  	dish_category : "Main", 
  	dish_price : 12.5, 
  	dish_image : "http://xinwang.com.sg/wp-content/uploads/2014/07/pasta1.jpg",
  };
  const dummyMenu3 = { 
  	_id: new Meteor.Collection.ObjectID(),
  	dish_name : "Papaya Soup Pork Chop", 
  	dish_category : "Main", 
  	dish_price : 8.5, 
  	dish_image : "http://xinwang.com.sg/wp-content/uploads/2014/07/Papaya-Soup_Pork-Chop.jpg",
  };
  const dummyMember  = {
  	_id: new Meteor.Collection.ObjectID(),
  	email: "test@t.t",

  };

  Menu.insert(dummyMenu1);
  Menu.insert(dummyMenu2);
  Menu.insert(dummyMenu3);
  
});

Meteor.methods({
	//extra methods
});