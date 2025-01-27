const mongoose = require('mongoose');

const date = new Date().toISOString().split('T')[0];
const productSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name field must be string and cannot be blank']},
    sku: {type: String},
    unit: {type: String, required: true, enum: ['Pcs', 'KG', 'Litre', 'Meters', 'Grams', 'ML', 'Gallon', 'Dozen', 'Pack', 'Box', 'Bag', 'Bundle', 'Roll', 'Sheet', 'Pair', 'Set', 'Others']},
    dimension: {type: String},
    weight: {type: String},
    brand: {type: String},
    manufacturer: {type: String},
    color:{type: String},
    category: {type: String, required: true, enum: ['Electronics', 'Electricals']},
    salePrice: {type: String, required: true},
    purchasePrice: {type: String, required: true},
    saleDescription: {type: String},
    purchaseDescription: {type: String},
    openingStock: {type: Number},
    openingStockRPU: {type: Number},
    addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    updatedOn: {type: Date, default: () => date},
});

const Products = mongoose.model('Product', productSchema);
module.exports = Products;