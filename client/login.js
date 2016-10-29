import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Mmeber, Coupon, Menu } from '../api/database.js';

import './login.html';

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var name = $('[name=name]').val();
        var gender = $('[name=gender]').val();
        // fetch by Meteor.users.find().fetch();
        Accounts.createUser({
            email: email,
            password: password
        });
        var userId = Meteor.userId();
        Router.go('home');
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password);
        Router.go('home');
    }
});

Template.login.onRendered(function(){
    $('.login').validate();
});



// radio button

$(function() {
    // Input radio-group visual controls
    $('.radio-group label').on('click', function(){
        $(this).removeClass('not-active').siblings().addClass('not-active');
    });
});