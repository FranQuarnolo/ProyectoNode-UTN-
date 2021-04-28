var express = require('express');
var router = express.Router();

/* Get de la HOME */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'E-Comerce Quarñolo.F' });
});

module.exports = router;
