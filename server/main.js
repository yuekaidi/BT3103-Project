import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Order, Member, Coupon, Menu } from '../api/database.js';

Meteor.startup(() => {
  // code to run on server at startup
  Menu.remove({});
  Coupon.remove({});
  
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

  const dummyCoupon1 = {
    _id: new Meteor.Collection.ObjectID(),
    coupon_name: "New Coming 5% Discount",
    coupon_discount: 0.95,
  };

  const dummyCoupon2 = {
    _id: new Meteor.Collection.ObjectID(),
    coupon_name: "Loyalty 10% Discount",
    coupon_discount: 0.9,
  };

  Coupon.insert(dummyCoupon1);
  Coupon.insert(dummyCoupon2);
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
	                    coupon: coupon,
	                    admin: admin
	                }); 
    console.log("New User Registration Complete!");
    },

    'update_coupon' (id, consumed) {
      var coupon = Member.find({_id: id}).fetch()[0].coupon;
      coupon.consumed = consumed;
      var date = new Date();
      coupon.issue_date =  date;
      coupon.expiration_date = date  + 7 * (24 * 60 * 60 * 1000);
      Member.update({_id: id}, {$set: {coupon: coupon}});
      //Member.update({_id: id}, {$push: {coupon_info: {consumed: consumed, issue_date: new Date(), expiration_date: Date.now() + 7 * (24 * 60 * 60 * 1000)}}});
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
      console.log("New Dish inserted!");
    },

    'update_dish' (id, name, price, cat, url) {
      Menu.update({_id: id}, {
        dish_name: name, 
        dish_price: price, 
        dish_category: cat, 
        dish_image: url,
      });
      console.log("Dish updated!");
    },
 

});