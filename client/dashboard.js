import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Order, Mmeber, Coupon, Menu } from '../api/database.js';

import './dashboard.html';

Template.dashboard.helpers({

	//functions
	manager_name() {
		return "Benedict"; //Flag, to be revised later
	}


});

Template.dashboard.events({
	//funcitons


});

