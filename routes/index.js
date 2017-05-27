var express = require('express');
var router = express.Router();

//this is the main index route and will respond with the home page for the app
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pantry Partner' });
});

module.exports = router;
