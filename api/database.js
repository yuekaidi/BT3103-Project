import { Mongo } from 'meteor/mongo';
// initialize game database
export const Order = new Mongo.Collection('order');
export const Member = new Mongo.Collection('member');
export const Coupon = new Mongo.Collection('coupon');
export const Menu = new Mongo.Collection('menu');
