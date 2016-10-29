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
		return obj; 
	},

    //return all orders 
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
            orderDate.push(allOrders[i].created_date);
            orderInfo.push([orderDate, allOrders[i].payable_amount]);
        }

        console.log("Order Info is :", orderInfo.toString());

        // Use Meteor.defer() to craete chart after DOM is ready:
        Meteor.defer(function() {
            Highcharts.chart('chart', {
                title: {
                    text: "Customer Each Order Amount",
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

                series: [{
                    type: 'column',
                    name: 'Amount ($)',
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










