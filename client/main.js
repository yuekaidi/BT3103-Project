import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Mmeber, Coupon, Menu } from '../api/database.js';

import './main.html';
import './login.js';
import './dashboard.js';
import './dashboard.js';
import './dashboard.html';
import '/lib/routing.js';

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('home');
    }
});