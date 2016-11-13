import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { Order, Member, Coupon, Menu, Authcode} from '../api/database.js';

import './profile.html';

Session.setDefault('error', '');

if (Meteor.isCordova || Meteor.isClient) {
	Template.profile.events({
		"click #info": function () {
			$(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
	    	// $(".tab").addClass("active"); // instead of this do the below 
	    	$("#info").removeClass("btn-default").addClass("btn-primary");   
		},
		"click #coupon": function () {
			$(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
	    	// $(".tab").addClass("active"); // instead of this do the below 
	    	$("#coupon").removeClass("btn-default").addClass("btn-primary");   
		},
		"click #history": function () {
			$(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
	    	// $(".tab").addClass("active"); // instead of this do the below 
	    	$("#history").removeClass("btn-default").addClass("btn-primary");   
		},

	  	'click #add': function(e) {
		    e.preventDefault();
		    $('#activationModal').modal('show');
  		},

  		'click #auth': function() {
  			var authcode = document.getElementById("code").value;
  			if (Authcode.findOne({_id: authcode})) {
  				var memberid = Authcode.findOne({_id: authcode}).memberid;
  				$('#activationModal').modal('hide');
  				Member.update({_id: Meteor.userId()}, {$set:{memberid: memberid, joindate: new Date()}});
  				Authcode.remove({_id:authcode});
  				var coupon = Coupon.find({_id:"0050"}).fetch()[0];
  				coupon.issue_date = new Date();
  				coupon.expiration_date = null;
  				Member.update({_id: Meteor.userId()}, {$push: {coupon: coupon}});
  			}
  			else {
  				Session.set('error', 'This activation code is not valid');
  			}

  		}
	});

	Template.profile.helpers({
		user() {
	        return Member.findOne({_id: Meteor.userId()});
		},

		error() {
			return Session.get('error');
		},

		allOrders() {
        	return Order.find({member_id: Meteor.userId()});
    	},

    	allCoupons() {
    		return Member.findOne({_id: Meteor.userId()}).coupon;
    	}
	});
}



// db.authcode.insert({_id:"3DH5XY", memberid:"000000"})
// db.authcode.insert({_id:"2FTHRF", memberid:"000001"})
// db.authcode.insert({_id:"2S2KBX", memberid:"000002"})
// db.authcode.insert({_id:"2XJTQD", memberid:"000003"})
// db.authcode.insert({_id:"34WSA5", memberid:"000004"})
// db.authcode.insert({_id:"4G5N49", memberid:"000005"})
// db.authcode.insert({_id:"3CS7UD", memberid:"000006"})
// db.authcode.insert({_id:"Y9J353", memberid:"000007"})
// db.authcode.insert({_id:"D447AX", memberid:"000008"})
// db.authcode.insert({_id:"ADD6ZQ", memberid:"000009"})
// db.authcode.insert({_id:"6ZPZED", memberid:"000010"})
// db.authcode.insert({_id:"Z2W9P9", memberid:"000011"})
// db.authcode.insert({_id:"X29M8Z", memberid:"000012"})
