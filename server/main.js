import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Order, Member, Coupon, Menu } from '../api/database.js';

Meteor.startup(() => {
  // code to run on server at startup
  Menu.remove({});
  //Member.remove({});
  //Order.remove({});
  
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

  Menu.insert(dummyMenu1);
  Menu.insert(dummyMenu2);
  Menu.insert(dummyMenu3);
/*
  const dummyMember1 = {
  	_id: new Meteor.Collection.ObjectID(),
  	email: "admin@abc.com",
  	password: "abc",
  	firstname: "Admin",
  	lastname: "Admin",
  	gender: "F",
  	coupon: [],
  	admin: true,
  };

  Member.insert(dummyMember1);
*/
  /*Accounts.createUser({
  	email: "admin@abc.com",
	password: "abc",
  });*/
 
});

Meteor.methods({
	//extra methods
	'insert' (id, firstname, lastname, gender, coupon, admin) {
		Member.insert({
	                    _id: id,
	                    firstname: firstname,
	                    lastname: lastname,
	                    gender: gender,
	                    coupon: [],
	                    admin: admin
	                }); 
    },

    'update_admin_true' (id) {
      Member.update({_id, id}, {$set: {admin: true}})
    },

    'update_admin_false' (id) {
      Member.update({_id, id}, {$set: {admin: false}})
    },

    'insert_dish' (name, price, cat, url) {
      Menu.insert({
        _id: new Meteor.Collection.ObjectID(),
        dish_name: name, 
        dish_price: price, 
        dish_category: cat, 
        dish_image: url,
      });
    },

    'update_dish' (id, name, price, cat, url) {
      Menu.update({_id: id}, {
        dish_name: name, 
        dish_price: price, 
        dish_category: cat, 
        dish_image: url,
      });
    },
 

});