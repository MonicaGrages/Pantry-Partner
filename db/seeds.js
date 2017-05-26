var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pantry_partner');

var User = require("../models/user.js");
var FoodItem = require("../models/item.js");

mongoose.promise = global.Promise;

User.remove({}, function(error) {
  console.log(error);
});

FoodItem.remove({}, function(err) {
  console.log(err);
});

var monica = new User({
  name: 'Monica',
  email: 'mgrages1@gmail.com',
  favorite_food: 'tofu',
  items: [{
    name: "milk",
    food_group: "dairy",
    expirationDate: new Date("May 29, 2017"),
    expired: false,
    comments: "for Friday night milkshakes"
    },
    {
    name: "tofu",
    food_group: "meat/protein",
    expirationDate: new Date("May 29, 2017"),
    expired: false,
    comments: "tofu stir fry!"
    }]
});


monica.save(function(error) {
  if (error) {
    console.log(error);
    return;
  }

  console.log('Monica created!');
});


