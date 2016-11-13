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

  const coupon5 = {
    _id: "0050",
    coupon_name: "Basic 5% Off",
    coupon_discount: 0.95,
    coupon_description: "With purchase of any meal. \n This discount will be automatic in your orders.",
  };

  const coupon75 = {
    _id: "0075",
    coupon_name: "Alluring 7.5% Off",
    coupon_discount: 0.925,
    coupon_description: 'with purshase of above 20 dollars. \n The coupon is valid for 30 days.',
  };

  const coupon10 = {
    _id: "0100",
    coupon_name: "Loyalty 10% Off",
    coupon_discount: 0.9,
    coupon_description: 'with purshase of above 50 dollars. \n The coupon is valid for 30 days.',
  };

  Coupon.insert(coupon5);
  Coupon.insert(coupon75);
  Coupon.insert(coupon10);
 
});

Meteor.methods({
	//extra methods

    'update_coupon' (coupon, consumed, days) {

      var date = new Date();
      coupon.issue_date =  date;
      coupon.expiration_date = date  + days * (24 * 60 * 60 * 1000);
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

    'create_coupon' (name, rate) {
      Coupon.insert({
        _id: new Meteor.Collection.ObjectID(),
        coupon_name: name, 
        coupon_discount: rate,
      });
      console.log("New coupon created!");
    },

    'update_user_info' (id, username, firstname, lastname, gender) {
      Member.update({_id: id}, {$set: {username: username, firstname: firstname, lastname: lastname, gender: gender}});
    },

    'create_order' (coupon_id, id, date, amt, discount_amt, dishes) {
      Order.insert({
        _id: new Meteor.Collection.ObjectID(),
        coupon_id: coupon_id,
        member_id: id,
        created_date: date,
        payable_amount: amt,
        payable_amount_discount: discount_amt,
        dishes: dishes,
      });
      console.log('new order created!');
    }
 

});