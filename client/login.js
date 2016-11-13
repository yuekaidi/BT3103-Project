import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './login.html';

Session.setDefault('error', '');

if (Meteor.isCordova || Meteor.isClient) {

    Template.register.events({
        // radio button
        'click .male': function(){
            $('.male').removeClass('not-active').addClass('gender');
            $('.female').addClass('not-active').removeClass('gender');
        },

        'click .female': function(){
            $('.female').removeClass('not-active').addClass('gender');
            $('.male').addClass('not-active').removeClass('gender');
        },

        'submit form': function(event){
            event.preventDefault();
            var firstname = $('[name=firstname]').val();
            var lastname = $('[name=lastname]').val();
            var gender = $('input[name=gender]:checked').val();
            var email = document.getElementById("email")
            var reenteremail = document.getElementById("reenteremail");
            function validateEmail(){
                if (email.value != reenteremail.value) {
                    reenteremail.setCustomValidity("Emails Don't Match");
                } else {
                    reenteremail.setCustomValidity('');
                }
            }
            email.onchange = validateEmail;
            reenteremail.onkeyup = validateEmail;
            var password = document.getElementById("password")
            var confirm_password = document.getElementById("confirm_password");
            function validatePassword(){
                if (password.value != confirm_password.value) {
                    confirm_password.setCustomValidity("Passwords Don't Match");
                } else {
                    confirm_password.setCustomValidity('');
                }
            }
            password.onchange = validatePassword;
            confirm_password.onkeyup = validatePassword;
            Accounts.createUser({
                email: email.value,
                password: password.value
            }, function(error){
                if(error){
                    console.log(error);
                    if (error.error == 403) {
                        Session.set('error', 'This email is already registered');
                    } else if (error.error == "too-many-requests") {
                        Session.set('error', "Slow down please > <, trying again later.");
                    } else {
                        Session.set('error', error.reason);
                    }
                } else {
                    Session.set('error', '');
                    Member.insert({
                        _id: Meteor.userId(),
                        email: email.value,
                        firstname: firstname,
                        lastname: lastname,
                        gender: gender,
                        memberid: null,
                        joindate: null,
                        coupon: [],
                        admin: false,
                        picture: "http://image.flaticon.com/icons/png/512/145/145863.png"
                    });
                    if (gender == "female") {
                        Member.update({_id: Meteor.userId()}, {$set:{picture: "http://image.flaticon.com/icons/svg/145/145852.svg"}});
                    }
                    Router.go("profile"); // Redirect user if registration succeeds
                }
            });
        }
    });

    Template.register.helpers({
        error() {
            return Session.get('error');
        }
    });

    Template.login.events({
        'submit form': function(event){
            event.preventDefault();
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function(error){
                if(error){
                    Session.set('error', error.reason);
                }
                else{
                    Session.set('error', '');
                    Router.go('profile');
                }
            });
        }
    });

    Template.login.onRendered(function(){
        $('.login').validate();
    });

    Template.login.helpers({
        error() {
            return Session.get('error');
        }
    });

};