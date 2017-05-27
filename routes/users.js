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
    console.log('new user saved: '+ newUserInfo.name);
    //redirect to users index page after saving
    response.redirect('/users');
  })
})

//this is the user show route
router.get('/:id', function(request, response) {
  //store the id url parameter as a variable
  var userId = request.params.id;
  User.findById(userId)
  .exec(function(error, user) {
    if(error) {
      console.log('error finding user '+userId+' : '+error);
      return;
    }
    response.render('users/show', {
      user : user,
      userId : userId
    });
  })
});

//just showing the edit form. have to pass in which user to edit
router.get('/:id/edit', function (request, response) {
  var userId = request.params.id;
  User.findById(userId)
  .exec(function (error, userToEdit) {
    if(error) {
      console.log('error trying to get edit form for user: '+userId);
      return;
    }
    response.render('users/edit', {
      userToEdit : userToEdit
    });
  })
})

//handle the update request made by the edit form
router.patch('/:id', function (request, response) {
  var userId = request.params.id;
  User.findByIdAndUpdate(userId, {
    name: request.body.name,
    email: request.body.email,
    favorite_food: request.body.favorite_food
  }, {new: true})
  .exec(function (error, updatedUser) {
    if(error) {
      console.log('error updating user '+userId+': '+error);
      return;
    }
    response.render('users/show', {
      user : updatedUser
    });
  });
});

//handles delete request from button on user show page
router.delete('/:id', function(request, response) {
  var userId = request.params.id;
  User.findByIdAndRemove(userId)
  .exec(function(error, userToDelete) {
    if(error) {
      console.log('error deleting user '+userId+' : '+error);
      return;
    }
    response.redirect('/users');
  });
});

//show the new item form. must be tied to user id
router.get('/:userId/items/new', function(request, response) {
  //show the new item page
  userId = request.params.userId
  response.render('items/new', {
    userId : userId
  });
})

//create a new item
//handles post request from new item form
router.post('/:userId/items', function(request, response) {
  var userId = request.params.userId;
  var newItem = request.body;
  User.findById(userId)
  .exec(function(error, user) {
    user.items.push(new FoodItem ({
      name: newItem.name,
      food_group: newItem.food_group,
      expiration_date: newItem.expiration_date,
      comments: newItem.comments
    }));
    user.save(function (error) {
      if(error) {
        console.log('error deleting user '+userId+' ; '+error);
        return;
      }
      response.redirect('/users/'+userId);
    });
  });
});


//show the food item edit form
router.get('/:userId/items/:itemId/edit', function (request, response) {
  var userId = request.params.userId;
  var itemId = request.params.itemId;
  User.findById(userId)
  .exec(function (error, user) {
    if (error) {
      console.log(error);
      return;
    }
    var foodToEdit = user.items.find(function (item) {
      return item.id === itemId;
    });
    response.render('items/edit', {
      foodToEdit : foodToEdit,
      itemId : itemId,
      userId : userId
    })
  })
});


// item show page
// need to fix link on user show page
router.get('/:userId/items/:itemId', function (request, response) {
  var userId = request.params.userId;
  var itemId = request.params.itemId;
  User.findById(userId)
  .exec (function (error, user){
    var foodToShow = user.items.find(function (item) {
      return item.id === itemId;
    })
    response.render('items/show', {
    itemId : itemId,
    userId : itemId,
    user : user,
    foodToShow : foodToShow
    });
  });
});







module.exports = router;
