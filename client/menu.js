
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './menu.html';

Session.setDefault("dishname", []);
Session.setDefault("amt", 0);
var dishname = Session.get("dishname").slice();
Session.setDefault("createOrderId", "");


Template.menu.helpers({

    allDishes() {
        return Menu.find();
    }
});


Template.menu.events({
    /*
	'submit form': function(event, template){
        event.preventDefault();

        var name = $('[name=dishname]').val();
        var price = $('[name=price]').val();
        var cat = template.find('input:radio[name=category]:checked').value;
        
        console.log("details: " + name + " " + price + " " + cat)

        //insert into database
        Menu.insert({
        	dish_name: name,
        	dish_price: price, 
        	dish_category: cat,
        });

        Router.go('menu');
        template.find("form").reset();//re-initialize form fields
    },
    */

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
    id(){
        return this._id;
    }
});

Template.displayDish.events({

    'click .add-order': function(event, template) {

        var quantity = parseInt($(this).closest('.quantity').find('#quantity').val());   

        if (quantity > 0) {
            Session.set("amt", Session.get('amt') + quantity * this.dish_price);
            //console.log("Amt: ", Session.get("amt"));

            dishname.push({dish_id: this._id, quantity: quantity});
            Session.set("dishname", dishname);
        }
    },

    'click .quantity-right-plus': function(event, template) {
        // Stop acting like a button
        event.preventDefault();
        // Get the field name
        console.log(this.closest('.input-group').find('#quantity').val());
        var quantity = parseInt($(this).closest('.input-group').find('#quantity').val());        
        // If is not undefined           
            $(this).closest('.input-group').find('#quantity').val(quantity + 1);
            // Increment 
    },

    'click .quantity-left-minus': function(event, template) {
        // Stop acting like a button
        event.preventDefault();
        // Get the field name
        var quantity = parseInt($(this).closest('.input-group').find('#quantity').val());  
        // If is not undefined
            // Increment
            if(quantity>0){
                $(this).closest('.input-group').find('#quantity').val(quantity - 1);
            }
    },

    // 'click .quantity btn-number': function(event, template) {    
    //     event.preventDefault();
    //     var btn = $(this),
    //     oldValue = btn.closest('.quantity').find('input').val().trim(),
    //     newVal = 0;
    
    //     if (btn.attr('data-type') == 'plus') {

    //         newVal = parseInt(oldValue) + 1;
    //     } else {
    //         if (oldValue > 0) {
    //             newVal = parseInt(oldValue) - 1;
    //         } else {
    //             newVal = 0;
    //         }
    //     }
    //     btn.closest('.quantity').find('input').val(newVal);
    // },

});


Template.order.helpers({

    allOrders() {
        return Order.find({_id: Session.get("createOrderId")});
    },
});






