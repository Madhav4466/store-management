var express = require('express');
var router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const { errorHandler } = require('./middlewares/middleware');

/* GET users listing. */
router.get('/', errorHandler(function(req, res, next) {
	res.render('users/signup', {title: "Create Account"});
}));

router.post('/', errorHandler(async function(req, res, next) {
	const {firstName, lastName, email, mobile, password} = req.body;
	//const pwdToken = await bcrypt.hash(password, 12); {password: pwdToken}
	const newUser = new User({firstName, lastName, email, mobile, password: password});
	await newUser.save();
	res.redirect("login");
}));

module.exports = router;
