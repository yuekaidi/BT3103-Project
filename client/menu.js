
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './dashboard.html';

Session.setDefault("dishname", []);

Template.menu.helpers({

    allDishes() {
        return Menu.find();
    }
});

Template.menu.events({

    //submit the form
	'submit form': function(event, template){
        event.preventDefault();

        var name = $('[name=dishname]').val();
        var price = $('[name=price]').val();
        var cat = template.find('input:radio[name=category]:checked').value;
        
        console.log("details: " + name + " " + price + " " + cat)

        //insert into database
        Menu.insert({
        	name: name,
        	unit_price: price, 
        	category: cat,
        });

        Router.go('menu');
        template.find("form").reset();//re-initialize form fields
    },

});


Template.displayDish.events({

    // click on the checkbox to make order
    'click #orderbutton': function (event, template) {

        //event.preventDefault();
        console.log("You clicked on Dish: " + this.name + " And its _id is: " + this._id);

        Session.set("dishname", this.name);
        console.log(Session.get("dishname"));

        // to be continued

    },

});









