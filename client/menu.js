
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


Template.displayDish.events({

    'change .number': function(event, template) {

        var val = template.$('.number').val(); // order qty
        //console.log(val);

        Session.set("amt", Session.get('amt') + val * this.dish_price);
        //console.log("Amt: ", Session.get("amt"));

        dishname.push({dish_id: this._id, quantity: val});
        Session.set("dishname", dishname);
    },

});


Template.order.helpers({

    allOrders() {
        return Order.find({_id: Session.get("createOrderId")});
    },
});






