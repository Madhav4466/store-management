var express = require('express');
const { errorHandler } = require('./middlewares/middleware');
var router = express.Router();

router.get('/', errorHandler(function(req, res, next) {
	if(req.session.user_id){
		res.redirect("/dashboard");
	}
	res.render("public-home", {title: "E-Store: Home"});
}));

module.exports = router;
