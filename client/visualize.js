import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './visualize.html';

Template.visualization.helpers({

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
                    text: "Monthly Revenue",
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
                    type: 'pie',
                    name: 'Payable amount',
                    data: orderInfo,
                },
                ],
            });

        });
    }
});