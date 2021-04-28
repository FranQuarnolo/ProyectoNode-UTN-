var express = require('express');
var router = express.Router();
const usersWebController = require("../controllers/usersWebController")

/* GET users listing. */
router.post('/', usersWebController.create);
router.post('/login', usersWebController.login);


module.exports = router;
