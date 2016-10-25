import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Mmeber, Coupon, Menu } from '../api/database.js';


import './index.html';
import './login.html';
import '../lib/routing.js';


//to store the created order
var createdOrderId = new ReactiveVar(null);


Template.order.helpers({
    createdOrder(){
        console.log(createdOrderId.get());
        console.log(this._id);

    	return Orders.find({ _id: createdOrderId.get()});
    }

});


Template.order.events({
	'click .createOrder': function(){
		//window.alert("A new order has been created");
		sampleOrder={
		id: 123456787,
        coupon_id:1001,
        member_id:1001,
        number_of_diner: 3,
        created_date: new Date ("03/01/2016"),
        coupon_id: 1001,
        payable_amount: 50.00,
        paying_method: "member card",
        dishes: [
            {
                dish_id: 1001,
                quantity: 1
            },
            {
                dish_id: 2001,
                quantity: 2
            }
        ]
    };
    createdOrderId = Orders.insert(sampleOrder);
    console.log(createdOrderId);
    customer=Members.findOne({member_id: sampleOrder.member_id});
    id=customer._id;
    Members.update({ _id: id },{ $push: { order_history: {order_id: sampleOrder.id }}});
	}
})