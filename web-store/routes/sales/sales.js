const express = require('express');
var router = express.Router();
const SaleInvoice = require("../../models/invoices/sales");
const User = require("../../models/users");
const Product = require("../../models/products");
const WebErrorHandler = require("../../handlers/errorHandler");
const { requireLogin, errorHandler } = require('../middlewares/middleware');

const getEnums = (schema, path) => {
    return schema.path(path).enumValues;
};

router.get('/', requireLogin, errorHandler(async (req, res, next)=> {
    const invoices = await SaleInvoice.find({});
    if(!invoices){
        throw new WebErrorHandler("No Sale Invoices Created Yet!", 400);
    }
    res.render("sales/index", {title: "All Sale Invoices", invoices: invoices});
}));

router.get('/new', requireLogin, errorHandler(async (req, res, next)=> {
    const users = await User.find({});
    const currentUser = await User.findById(req.session.user_id);
    const products = await Product.find({});
    const paymentStatuses = getEnums(SaleInvoice.schema, 'paymentStatus');
    const paymentMethods = getEnums(SaleInvoice.schema, 'paymentMethod');
    const invoices = await SaleInvoice.find({});

    res.render("sales/new", { title: "New Invoice", currentUser: currentUser, users: users, products: products, paymentStatuses: paymentStatuses, paymentMethods: paymentMethods, invoices: invoices });
}));

module.exports = router;
