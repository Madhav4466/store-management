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
    const invoices = await SaleInvoice.find({}).populate('items.productId').populate('salesPerson');
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

    let counter = await Counter.findOne({ name: 'invoiceNumber' });

    if (!counter) {
        // If the counter doesn't exist, create it with seq = 1
        counter = new Counter({ name: 'invoiceNumber', seq: 1 });
        await counter.save();  // Save the new counter
    }

    // Use the current seq directly for the invoice number
    const invoiceNumber = counter.seq.toString().padStart(8, '0');

    res.render("sales/new", { 
        title: "New Invoice", 
        currentUser: currentUser, 
        users: users, 
        products: products, 
        paymentStatuses: paymentStatuses, 
        paymentMethods: paymentMethods, 
        invoices: invoices,
        invoiceNumber: invoiceNumber
    });
}));
}));

module.exports = router;
