var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var FoodItem = require('../models/item.js')

/* Index route for showing all users */
router.get('/', function(request, response) {
  User.find({})
    .exec(function (error, usersList) {
      if(error) {
        console.log('Error trying to get usersList: '+error);
        return;
      }
      response.render('users/index', {
        usersList : usersList
      })
    })
});


//Show the new user form
router.get('/new', function (request, response) {
  response.render('users/new');
});


//Create a new user based on new user form input
router.post('/', function(request, response) {
  var newUserInfo = request.body;
  //get the new user's info from the form input
  var newUser = new User({
    name : newUserInfo.name,
    email : newUserInfo.email,
    favorite_food : newUserInfo.favorite_food
  });
  //save the newUser to the db
  newUser.save(function(error, newUser) {
    if(error) {
      console.log('error when adding new user: '+error);
      return;
    }
    console.log('new user saved');
    //redirect to users index page after saving
    response.redirect('/users');
  })
})



module.exports = router;
