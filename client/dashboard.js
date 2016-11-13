import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './dashboard.html';

if (Meteor.isCordova || Meteor.isClient) {
Template.dashboard.helpers({

	// return current member object
	user() {
        return Member.findOne({_id: Meteor.userId()});
	},

    //return all orders by this user
    allOrders() {
        return Order.find({member_id: Meteor.userId()});
    },

    //create high charts
    createChart() {
      
        var Highcharts = require('highcharts/highstock');
        // Gather data: 
        var allOrders = Order.find({member_id: Meteor.userId()}).fetch(); //fetch()
        var orderInfo = [];
        var orderDate = [];
        
        //fetch data
        for (i = 0; i < allOrders.length; i ++) {
            orderDate.push(allOrders[i].date_string);
            orderInfo.push([orderDate, allOrders[i].payable_amount]);
        }

        console.log("Order Info is :", orderInfo.toString());

        // Use Meteor.defer() to craete chart after DOM is ready:
        Meteor.defer(function() {
            Highcharts.chart('chart', {
                title: {
                    text: "Order Summary",
                },

                yAxis: {
                    title: {
                        text: "Amount ($)",
                    },
                },

                xAxis: {
                    categories: orderDate,
                    crosshair: true,
                },

                colors: ['#358E96'],

                series: [{
                    type: 'column',
                    name: 'Payable amount',
                    data: orderInfo,
                },
                ],
            });

        });//end of defer()

    } // end of createChart()


});

Template.dashboard.events({

	//funcitons : create orders
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

Template.coupon.helpers({

    allCoupons() {
        return Coupon.find({});
    },

    customers() {
        return Member.find({admin: false}); //return only customers
    }
});

Template.coupon.events({

    'click .coupon1': function (event, template) {
        event.preventDefault();
        console.log("clicked");

        var name = $('[name=name]').val();
        var rate = $('[name=rate]').val();

        Meteor.call('create_coupon', name, rate);
        template.$('[name=name]').val("");
        template.$('[name=rate]').val("");
    },
});

Template.displayCustomer.events({

    'click #showIssueCoupon': function(event, template) {
        event.preventDefault();
        console.log('click on customer id: ', this.firstname);

        template.$('#issueCoupon').modal('show');
    },

    // issue a coupon
    'click #issue': function(event, template) {
        event.preventDefault();

        console.log('issue a coupon');
        var name = template.$('[name=name]').val();
        var rate = template.$('[name=rate]').val();
        var des = template.$('[name=description]').val();
        var exp = template.$('[name=expire]').val();

        Meteor.call('issue_coupon', this._id, name, rate, des, exp);
        console.log('Coupon Issued!');

        //reset
        template.$('[name=name]').val("");
        template.$('[name=rate]').val("");
        template.$('[name=description]').val("");
        template.$('[name=expire]').val("");
    }
});

}




