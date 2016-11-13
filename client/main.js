import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './main.html';
import './login.js';
import '/lib/routing.js';


if (Meteor.isCordova || Meteor.isClient) {
Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        console.log("log out");
        Router.go('home');
    },
});

Template.navigation.helpers({

    profile() {
    	return Member.findOne({_id:Meteor.userId()}).firstname;
    },
    
	isAdmin() {
        var member = Member.find({_id: Meteor.userId()}).fetch();
        return member[0].admin;
    }
});

Template.home.helpers({
    profile() {
        return Member.findOne({_id:Meteor.userId()}).firstname;
    },
});
}