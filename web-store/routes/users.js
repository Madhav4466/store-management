var express = require('express');
const { errorHandler } = require('./middlewares/middleware');
var router = express.Router();

router.get('/', errorHandler(function(req, res, next) {
  res.redirect("/login")
}));

module.exports = router;
