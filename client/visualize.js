import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './visualize.html';

Template.admindashboard.helpers({
    totalUsers() {
        return Member.find({}).count();
    },
    totalOrders() {
        return Order.find({}).count();
    },
    totalMembers() {
        var total = 0;
        Member.find({}).fetch().forEach(function(entry) {
            if (entry.memberid != null) { total++; }
        });
        return total;
    },
    totalRevenue() {
        var total = 0;
        Order.find({}).fetch().forEach(function(entry) {
            total = total + entry.payable_amount;
        });
        return total;
    },
    
    createChart() {
        var Highcharts = require('highcharts/highstock');
        var allOrders = Order.find({}).fetch();
        var orderInfo = [];
        var orderDate = [];
        
        for (i = 0; i < allOrders.length; i ++) {
            orderDate.push(allOrders[i].date_string);
            orderInfo.push([orderDate, allOrders[i].payable_amount]);
        }

        // Use Meteor.defer() to craete chart after DOM is ready:
        Meteor.defer(function() {
            Highcharts.chart('chart', {
                title: {
                    text: "Revenue per order",
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

        });
    },

    genderChart() {
        var Highcharts = require('highcharts/highstock');
        var male = 0;
        var female = 0;
        
        Member.find({}).fetch().forEach(function(entry) {
            if (entry.gender == 'male') { male++; }
            else {female++; }
        });

        var compo = [male,female];

        // Use Meteor.defer() to craete chart after DOM is ready:
        Meteor.defer(function() {
            Highcharts.chart('chart2', {
                title: {
                    text: "Gender distribution",
                },
                colors: ['#358E96'],
                series: [{
                    type: 'pie',
                    name: 'Number',
                    data: [{
                        name: 'male',
                        y: male
                    }, {
                        name: 'Female',
                        y: female
                    }] 
                }],
            });

        });
    },


});