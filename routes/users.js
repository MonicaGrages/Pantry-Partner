var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('show all the users here');
});

//show the new user form
router.get('/new', function (request, response) {
  response.send('show the new user form here');
});


module.exports = router;
