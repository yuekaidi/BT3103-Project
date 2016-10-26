import './dashboard.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Member, Coupon, Menu } from '../api/database.js';


Template.menu.helpers({

    allDishes() {
        return Menu.find();
    }
});

Template.menu.events({

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
    }
});










