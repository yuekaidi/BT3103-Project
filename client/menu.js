
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './menu.html';

Session.setDefault("dishname", []);
Session.setDefault("amt", 0);
Session.setDefault("discountAmount", Session.get('amt'));
Session.setDefault("coupon", 1);

var dishname = Session.get("dishname").slice();

if (Meteor.isCordova || Meteor.isClient) {

Template.menu.helpers({

    isAdmin() {
        var member = Member.find({_id: Meteor.userId()}).fetch();
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

    totalPriceWithDiscount() {
        return Session.get('discountAmount');
    }
});


Template.menu.events({

    // manager create dish
    'click #form1': function(event, template) {
        event.preventDefault();

        var name = template.$('[name=name]').val();
        var price = template.$('[name=price]').val();
        var cat = template.$('[name=cat]').val();
        var url = template.$('[name=url]').val();

        Meteor.call('insert_dish', name, price, cat, url);
        //reset
        template.$('[name=name]').val("");
        template.$('[name=price]').val("");
        template.$('[name=cat]').val("");
        template.$('[name=url]').val("");
    },

    //customers make the final order
    'click #form2': function (event, template) {
        event.preventDefault();

        if(Session.get('amt') == 0 ){ // prevent empty order 
            alert('Error: empty in basket');
            return 0;
        } else {
            var now = new Date();
            Meteor.call('create_order', 1001, Meteor.userId(), now, now.toISOString().slice(0, 10) + "  " + now.toISOString().slice(11, 19), Session.get('amt'), Session.get('discountAmount'), dishname);
            //reset 
            Session.set("amt", 0);
            Session.set('discountAmount', Session.get('amt'));
            Session.set("dishname", []);
            dishname = [];

            //remove used coupn in this order
            var used_coupon_value = template.find('input:radio[name=rate]:checked').value;
            var all_coupons = Member.find({_id: Meteor.userId()}).fetch()[0].coupon;
            var temp = 0;
            for(i = 0; i < all_coupons.length; i ++) {
                if (used_coupon_value == i.coupon_discount)
                    temp = i;
                break;
            }
            var new_coupon = all_coupons[temp];
            Meteor.call('remove_used_coupon', Meteor.userId(), new_coupon);

            Router.go('dashboard');
        }
    },

});

Template.displayDish.events({

    'click .add-order': function(event, template) {
        event.preventDefault();
        var id = this._id;
        var quantity = parseInt(template.$('[name=quantity]').val());  

        if (quantity > 0) {
            Session.set("amt", Session.get('amt') + quantity * this.dish_price);
            Session.set("oriamt", Session.get("amt"));
            Session.set('discountAmount', Session.get('amt'));

            dishname.push({dish_id: this._id, dish_name: this.dish_name, dish_category: this.dish_category, dish_price: this.dish_price, quantity: quantity});
            Session.set("dishname", dishname);
        }
    },

    'click .quantity-right-plus': function(event, template) {
        // Stop acting like a button
        event.preventDefault();
        //console.log("clicked");                
        template.$('[name=quantity]').val(parseInt(template.$('[name=quantity]').val()) + 1);
        template.$('.btn').removeClass('disabled');
        template.$('.add-order').removeClass('disabled');
    },

    'click .quantity-left-minus': function(event, template) {
        event.preventDefault();

        if(parseInt(template.$('[name=quantity]').val()) == 0){
            template.$('.quantity-left-minus').addClass('disabled');
            template.$('.add-order').addClass('disabled');
        } else {
            template.$('[name=quantity]').val(parseInt(template.$('[name=quantity]').val()) - 1);
        }
    },

});

Template.displayAvailabeCoupon.helpers({

    couponName() {
        var coupon = Member.find({_id: Meteor.userId()}).fetch()[0].coupon;
        return coupon;
    }
});

Template.displayAvailabeCoupon.events({

    'click #rate': function(event, template) {
        console.log('clicked');
        var rate = template.find('input:radio[name=rate]:checked').value; //
        Session.set('discountAmount', (Session.get('amt')*rate).toFixed(2));
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

};





