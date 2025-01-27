const express = require('express');
const { requireLogin, errorHandler } = require('./middlewares/middleware');
var router = express.Router();

router.get('/', requireLogin, errorHandler(async (req, res, next) => {
    res.render('index', {title: "E-Store: Dashboard"});
}));

module.exports = router;