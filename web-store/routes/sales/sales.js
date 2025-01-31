const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const SaleInvoice = require("../../models/invoices/sales");
const User = require("../../models/users");
const Product = require("../../models/products");
const WebErrorHandler = require("../../handlers/errorHandler");
const { requireLogin, errorHandler } = require('../middlewares/middleware');
const Counter = require('../../models/counter');

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

router.post('/', requireLogin, errorHandler(async (req, res, next)=> {
    const { salesman, products, totalAmount, balance, subTotal, customerName, email, mobile, address, otherCharges, gst, discount } = req.body;
    const customerDetails = {name: customerName, email: email, mobile: mobile, address: address}
    const parsedProducts = JSON.parse(products).map(product => ({
        productId: new mongoose.Types.ObjectId(product.productId),
        quantity: product.quantity,
        salePrice: product.salePrice,
        amount: product.amount
    }));

    const newSaleInvoice = new SaleInvoice({
        invoiceNumber: req.body.invoiceNumber,
        salesPerson: salesman,
        items: parsedProducts,
        totalAmount: parseFloat(totalAmount),
        subTotal: parseFloat(subTotal),
        customer: customerDetails,
        balance: balance,
        otherCharges: otherCharges,
        gst: gst,
        discount: discount
    });
    await newSaleInvoice.save();
    await Counter.findOneAndUpdate(
        { name: 'invoiceNumber' },
        { $inc: { seq: 1 } } 
    );
    res.redirect("/sales");
}));

router.delete('/:id', requireLogin, errorHandler(async (req, res, next) => {
    const { id } = req.params;
    const invoice = await SaleInvoice.findByIdAndDelete(id);
    res.json({message: "Invoice Deleted Successfully!"});
}));

router.get('/details/:id', requireLogin, errorHandler(async (req, res, next) => {
    const { id } = req.params;
    const invoice = await SaleInvoice.findById(id).populate('items.productId').populate('salesPerson');
    if(!invoice) throw new WebErrorHandler("Could not find invoice with id-"+id);
    res.json(invoice);
}));

router.post('/:id/edit', requireLogin, errorHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    if (updatedData || Object.keys(updatedData).length !== 0) {
        try {
            const invoice = await SaleInvoice.findByIdAndUpdate(id, updatedData, { new: true });
            if (!invoice) {
                return res.status(404).json({ error: 'Invoice not found' });
            }
            return res.json(invoice);
        } 
        catch (error) {
            next(error);
        }
    }
    return res.status(400).json({ error: 'No data provided for update' });
}));

module.exports = router;
