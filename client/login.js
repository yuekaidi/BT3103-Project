import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './login.html';

Template.register.events({
    // radio button
    'click .male': function(){
        $('.male').removeClass('not-active');
        $('.female').addClass('not-active');
    },

    'click .female': function(){
        $('.female').removeClass('not-active');
        $('.male').addClass('not-active');
    },

    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var firstname = $('[name=firstname]').val();
        var lastname = $('[name=lastname]').val();
        var gender = $('[name=gender]').val();
        var coupon = Coupon.findOne({coupon_name: "New Coming 5% Discount"});

        // fetch by Meteor.users.find().fetch();
        Accounts.createUser({
            email: email,
            password: password, 
        }, function(error){
            if(error){
                alert("Error!");
                console.log(error); // Output error if registration fails
            } else {
                Meteor.call('insert', Meteor.userId(), firstname, lastname, gender, coupon, false);
                Meteor.call('update_coupon', coupon, false, 7);
                Router.go("home"); // Redirect user if registration succeeds
            }
        });
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(err){
            if(err){
                console.log(err);
                alert("Error!");
                return false;
            }
            else{
                Router.go('home');
            }
        });
    }
});

Template.login.onRendered(function(){
    $('.login').validate();
});



