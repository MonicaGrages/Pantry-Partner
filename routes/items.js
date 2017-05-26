//i'm not sure I even really need this file

var express = require('express');
var router = express.Router();

//this is an index route for food items but I don't think I'm going to use it
router.get('/', function(req, res, next) {
  res.send('respond with a resource for food items index');
  //maybe it should just redirect to home page?
});


module.exports = router;
