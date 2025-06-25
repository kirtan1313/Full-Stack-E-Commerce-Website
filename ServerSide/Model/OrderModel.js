const mongoose = require('mongoose')
const userModel = require('../Model/UserModel')


const OrderSchema = new mongoose.Schema({
    shippingInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: Number, required: true },
        phone: { type: String, required: true }
    },

    orderItmes: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            images: { type: String, required: true },
            product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true },
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },

    paidAt: { type: Date, required: true },

    itemsPrice: { type: Number, default: 0, required: true },

    taxPrice: { type: Number, default: 0, required: true },

    shippingPrice: { type: Number, default: 0, required: true },

    totalPrice: { type: Number, default: 0, required: true },

    orderStatus: { type: String, required: true, default: 'processing' },

    deliverAt: Date,

    createAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Order', OrderSchema)