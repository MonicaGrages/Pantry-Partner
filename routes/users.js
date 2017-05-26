var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var FoodItem = require('../models/item.js')

/* Index route for showing all users */
router.get('/', function(request, response) {
    // User.find({})
    // .exec(function (error, usersList) {
    //   if(error) {
    //     console.log('Error trying to get usersList: '+error);
    //     return;
    //   }
    //   response.render('users/index', {
    //     usersList : usersList
    //   })
    // })
    response.render('users/index');
});

//show the new user form
router.get('/new', function (request, response) {
  response.send('show the new user form here');
});


module.exports = router;
