const express = require('express');
const { requireLogin, errorHandler } = require('../middlewares/middleware');
var router = express.Router();

router.get('/', requireLogin, errorHandler(async (req, res, next)=> {
    //const invoices = await Sales.find({});
    // if(!invoices){
    //     throw new WebErrorHandler("No Sale Invoices Created Yet!", 400);
    // }
    res.render("purchase/index", {title: "All Sale Invoices"});
}));

router.get('/new', requireLogin, errorHandler(async (req, res, next)=> {
    res.render("purchase/new", { title: "New Invoice" });
}));

module.exports = router;
