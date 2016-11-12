
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
    isAdmin() {
        var member = Member.find({_id: Meteor.userId()}).fetch();
        console.log(member[0].admin);
        return member[0].admin;
    },

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
        var coupon75 = Member.findOne({_id: Meteor.userId()}).coupon75;
        var coupon100 = Member.findOne({_id: Meteor.userId()}).coupon100;
        if (coupon100) { 
            Session.set('coupon', 0.1);
            return "10% off";
        }
        if (coupon75) {
            Session.set('coupon', 0.075);
            return "7.5% off";
        }        
    },

    coupon2() {
        return "5% off";
    }
});


Template.menu.events({
    'click #coupon': function () {
        var status = $('#coupon').prop('checked');
        if (status) {
            Session.set('amt', (Session.get('amt') * (1-Session.get('coupon'))).toFixed(2));
        }
        else {
            Session.set('amt', (Session.get("oriamt")));
        }
    },

    'click #coupon2': function() {
        var status = $('#coupon2').prop('checked');
        if (status) {
            Session.set('amt', (Session.get('amt') * (0.95)).toFixed(2));
        }
        else {
            Session.set('amt', (Session.get("oriamt")));
        }
    },

    //green
    'click #form1': function(template) {
        event.preventDefault();
        console.log("clicked");
        var name = $('[name=name]').val();
        var price = $('[name=price]').val();
        var cat = $('[name=cat]').val();
        var url = $('[name=url]').val();

        Meteor.call('insert_dish', name, price, cat, url);
        //reset
        $('[name=name]').val("");
        $('[name=price]').val("");
        $('[name=cat]').val("");
        $('[name=url]').val("");
    },

    'click #form2': function () {

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

Template.displayDish.events({

    //green
    'click .add-order': function(event, template) {

        var id = this._id;
        var quantity = parseInt(template.$('[name=quantity]').val());  

        if (quantity > 0) {
            Session.set("amt", Session.get('amt') + quantity * this.dish_price);
            Session.set("oriamt", Session.get("amt"));
            //console.log("Amt: ", Session.get("amt"));

            dishname.push({dish_id: this._id, dish_name: this.dish_name, dish_price: this.dish_price, quantity: quantity});
            Session.set("dishname", dishname);
        }
    },

    //gree
    'click .quantity-right-plus': function(event, template) {
        // Stop acting like a button
        event.preventDefault();
        //console.log("clicked");                
        template.$('[name=quantity]').val(parseInt(template.$('[name=quantity]').val()) + 1);
        template.$('.btn').removeClass('disabled');
        template.$('.add-order').removeClass('disabled');
    },

    //green
    'click .quantity-left-minus': function(event, template) {
        // Stop acting like a button
        event.preventDefault();
        //console.log("clicked");
        template.$('[name=quantity]').val(parseInt(template.$('[name=quantity]').val()) - 1);
        if(parseInt(template.$('[name=quantity]').val()) == 0){
            template.$('.quantity-left-minus').addClass('disabled');
            template.$('.add-order').addClass('disabled');
        }
    },

});

Template.displayDishAdmin.events({

    'click .form3': function (event, template) {
        event.preventDefault();
        console.log("clicked");
        console.log(this._id);

        template.$('input').prop('readonly', false);
        template.$('.form3').addClass('hide');
        template.$('.form4').removeClass('hide');

    },

    'click .form4': function(event, template) {
        event.preventDefault();
        console.log("clicked");

        var name = template.$('[name=name]').val();
        var price = template.$('[name=price]').val();
        var cat = template.$('[name=cat]').val();
        var url = template.$('[name=url]').val();

        Meteor.call('update_dish', this._id, name, price, cat, url);
        template.$('input').prop('readonly', true);
        template.$('.form4').addClass('hide');
        template.$('.form3').removeClass('hide');
    }

});


Template.order.helpers({

    allOrders() {
        return Order.find({_id: Session.get("createOrderId")});
    },


});






