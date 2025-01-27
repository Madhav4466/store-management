var express = require('express');
var router = express.Router();
const Product = require('../models/products');
const WebErrorHandler = require("../handlers/errorHandler");
const { requireLogin, errorHandler } = require('./middlewares/middleware');
const Users = require('../models/users');

const getMultiValues = async () => {    
    const unitEnum = Product.schema.path('unit').enumValues;
    const categoryEnum = Product.schema.path('category').enumValues;
    return {units: unitEnum, categories: categoryEnum};
}

router.get('/', requireLogin, errorHandler(async (req, res, next)=> {
    const products = await Product.find({}).populate("addedBy");
    if(!products){
        throw new WebErrorHandler("No Products Available", 400);
    }
    res.render("products/index", {products, title: "All Products", multiValues: await getMultiValues()});
}));

router.get('/view/:type', requireLogin, errorHandler(async (req, res, next) => {
    const {type} = req.params;
    const products = await Product.find({}).populate("addedBy");
    if(!products){
        throw new WebErrorHandler("No Products Available", 400);
    }
    res.render(`partials/products/product-${type}`, {products, title: "All Products", multiValues: await getMultiValues()});
}));

router.get('/details/:id', requireLogin, errorHandler(async function(req, res, next) {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        throw new WebErrorHandler("Product not found!", 400);
    }
    //res.render("products/details", {product, title: product.title});
    res.json(product);
}));

router.delete('/details/:id', requireLogin, errorHandler(async function(req, res, next) {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.json({message: "Product Deleted Successfully!!"});
}));

router.post('/details/:id/edit', requireLogin, errorHandler(async function(req, res, next) {
    const {id} = req.params;
    const updatedData = req.body;

    if (updatedData || Object.keys(updatedData).length !== 0) {
        try {
            const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.json(product);
        } 
        catch (error) {
            next(error);
        }
    }
    return res.status(400).json({ error: 'No data provided for update' });
}));

router.get('/new', requireLogin, errorHandler(async (req, res)=> {
    const unitEnum = Product.schema.path('unit').enumValues;
    res.render("products/new", {title: "New Product", multiValues: await getMultiValues()});
}));

router.post('/', requireLogin, errorHandler(async (req, res)=>{
    const {name, sku, unit, dimension, weight, brand, manufacturer, color, category, salePrice, purchasePrice, saleDescription, purchaseDescription, openingStock, openingStockRPU} = req.body;
    const user = await Users.findById(req.session.user_id);
    const newEntry = new Product({
        name: name, sku: sku, unit: unit, dimension: dimension, 
        weight: weight, brand: brand, manufacturer:manufacturer, color: color, 
        category: category, salePrice: salePrice, purchasePrice: purchasePrice, 
        saleDescription: saleDescription, purchaseDescription: purchaseDescription, 
        openingStock: openingStock, openingStockRPU: openingStockRPU,
        addedBy: user._id, updatedOn: Date.now()});
    await newEntry.save();
    const product = await Product.find(newEntry._id);
    res.redirect(`/products`);

}));
router.get('/mens', requireLogin, errorHandler(async (req, res)=>{
    const mensProducts = await Product.find({gender: "mens"});
    if(!mensProducts || mensProducts.length === 0){
        throw new WebErrorHandler("No Products for Mens yet!!", 400);
    }
    res.render("products/mens", {title: "Mens Product", products: mensProducts});
}));

router.get('/womens', requireLogin, errorHandler(async (req, res)=>{
    const womenProducts = await Product.find({gender: "women"});
    if(!womenProducts || womenProducts.length === 0) {
        throw new WebErrorHandler("No Products for Women yet!!", 400);
    }
    res.render("products/womens", {title: "Women Product", products: womenProducts});
}));

router.get('/children', requireLogin, errorHandler(async (req, res)=>{
    const childrenProducts = await Product.find({gender: "children"});
    if(!childrenProducts || childrenProducts.length === 0){
        throw new WebErrorHandler("No Products for Children yet!!", 400);
    }
    res.render("products/children", {title: "Children Product", products: childrenProducts});
}));

module.exports = router;
