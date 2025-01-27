var express = require("express");
var router = express.Router();
const User = require("../models/users");
const { errorHandler } = require("./middlewares/middleware");

router.get("/", errorHandler(function (req, res, next) { 
	if(req.session.user_id){
		return res.redirect("/dashboard");
	}
	res.render("users/login", { title: "Login", errorMessage: "" });
}));

router.post("/", errorHandler(async function (req, res, next) {
	const { email, password } = req.body;
	const redirectTo = req.session.returnTo || '/dashboard';
    const authenticatedUser = await User.authenticate(email, password);
    if (!authenticatedUser) {
		return res.render("users/login", { errorMessage: `The email or password is incorrect!!`, title: "Login" });
    } else {
		req.session.user_id = await authenticatedUser._id;
		req.session.userName = await authenticatedUser.firstName;
		delete req.session.returnTo;
		return res.redirect(redirectTo);
    }
}));

module.exports = router;
