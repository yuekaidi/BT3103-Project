import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Member, Coupon, Menu } from '../api/database.js';

import './dashboard.html';

Template.dashboard.helpers({

	//functions
	manager_name() {
		var name = Member.find(this._id);
		return name.first_name;
	}


});

Template.dashboard.events({
	//funcitons


});

