const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    salesPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customer: {
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zip: { type: String },
            country: { type: String }
        }
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
        }
    }],
    subTotal: { type: Number, required: true },
    tax: { type: Number },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, required: true, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
    paymentMethod: { type: String, required: true, enum: ['credit card', 'debit card', 'cheque', 'upi', 'cash', 'paypal'], default: 'cash' },
    invoiceDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
}, 
{
    timestamps: true
});

const SaleInvoice = mongoose.model('SaleInvoice', invoiceSchema);
module.exports = SaleInvoice;