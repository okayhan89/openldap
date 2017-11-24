var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res, next) {
  res.render('home2', { title: 'Express' });
});

module.exports = router;
