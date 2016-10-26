import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './dashboard.html';

Template.dashboard.helpers({

	// return current member object
	loginName() {
		var obj =  Member.find({_id: Meteor.userId()});
		console.log("_id: " + Meteor.userId());
		return obj; 
	},

	coupons() {
		return Coupon.find();
	},

});

Template.dashboard.events({


	//funcitons : create coupons
	'submit form': function(event, template){
        event.preventDefault();

        var name = $('[name=couponname]').val();
        var issuedate = $('[name=issuedate]').val();
        var expirationdate = $('[name=expirationdate]').val();
        var cat = template.find('input:radio[name=category]:checked').value;
        
        console.log("details: " + name + " " + issuedate + " " + expirationdate + " " + cat)

        //insert into database
        Coupon.insert({
        	name: name,
        	issuedate: issuedate, 
        	expirationdate: expirationdate,
        	category: cat,
        });

        Router.go('dashboard');
        template.find("form").reset();//re-initialize form fields
    }

});

