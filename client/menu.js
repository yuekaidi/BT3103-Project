
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './menu.html';

Session.setDefault("dishname", []);
Session.setDefault("amt", 0);
Session.setDefault("coupon", 1);
var dishname = Session.get("dishname").slice();
Session.setDefault("createOrderId", "");

// db.menu.insert({ "_id" : 1001, "dish_name" : "Fried Rice", "dish_category" : "Main", "dish_price" : 9.5, "dish_image" : "http://xinwang.com.sg/wp-content/uploads/2014/07/Xin-Wang-0006.jpg" })
// db.menu.insert({ "_id" : 1002, "dish_name" : "Salmon Spaghetti", "dish_category" : "Main", "dish_price" : 12.5, "dish_image" : "http://xinwang.com.sg/wp-content/uploads/2014/07/pasta1.jpg" })
// db.menu.insert({ "_id" : 1003, "dish_name" : "Papaya Soup Pork Chop", "dish_category" : "Main", "dish_price" : 8.5, "dish_image" : "http://xinwang.com.sg/wp-content/uploads/2014/07/Papaya-Soup_Pork-Chop.jpg" })

Template.menu.helpers({
    allDishes() {
        return Menu.find();
    },

    selected() {
        return Session.get("dishname");
    },

    totalPrice() {
        return Session.get("amt");
    },

    coupon() {
        var coupon75 = Meteor.users.findOne({_id: Meteor.userId()}).fetch().coupon75;
        var coupon100 = Meteor.users.findOne({_id: Meteor.userId()}).fetch().coupon100;
        if (coupon100) { 
            Session.set('coupon', 0.1);
            return "10% off";
        }
        if (coupon75) {
            Session.set('coupon', 0.075);
            return "7.5% off";
        }        
        Session.set('coupon', 0.05);
        return "5% off";
    }
});


Template.menu.events({
    'change input': function () {
        var status = event.target.coupon.checked;
        if (status) {
            Session.set('amt', Session.get('amt') * Session.get('coupon'));
        }
    },

    'submit form': function () {

        event.preventDefault();
        console.log("click on order button");

        // insert function will return an ID
        var temp = Order.insert({
            coupon_id: 1001,
            member_id: Meteor.userId(),
            created_date: new Date(),
            payable_amount: Session.get("amt"),
            dishes: dishname,
        });

        Session.set("createOrderId", temp);
        Session.set("amt", 0);
        Session.set("dishname", []);
        dishname = [];

        //console.log("inserted");
        Router.go('order');

    },



});

Template.displayDish.helpers({
    id() {
        return this._id;
    }
});

Template.displayDish.events({

    'click .add-order': function(event, template) {

        var id = this._id;
        var quantity = parseInt($('#quantity' + id).val());   

        if (quantity > 0) {
            Session.set("amt", Session.get('amt') + quantity * this.dish_price);
            //console.log("Amt: ", Session.get("amt"));

            dishname.push({dish_id: this._id, dish_name: this.dish_name, dish_price: this.dish_price, quantity: quantity});
            Session.set("dishname", dishname);
        }
    },

    'click .quantity-right-plus': function(event, template) {
        // Stop acting like a button
        event.preventDefault();
        // Get the field name
        var id = this._id;
        var quantity = parseInt($('#quantity' + id).val());        
        // If is not undefined           
            $('#quantity' + id).val(quantity + 1);
            // Increment 
    },

    'click .quantity-left-minus': function(event, template) {
        // Stop acting like a button
        event.preventDefault();
        // Get the field name
        var id = this._id;
        var quantity = parseInt($('#quantity' + id).val());  
        // If is not undefined
            // Increment
            if(quantity>0){ 
                $('#quantity' + id).val(quantity - 1);
            }
    },

});


Template.order.helpers({

    allOrders() {
        return Order.find({_id: Session.get("createOrderId")});
    },


});






