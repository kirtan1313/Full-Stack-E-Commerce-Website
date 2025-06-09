const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Product Name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please Enter Your Product Description']
    },
    price: {
        type: Number,
        required: [true, 'Please Enter Your Product Price']
    },
    ratings: {
        type: Number, default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, 'Please Enter Your Valid Product Category']
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter Your Stock'],
        maxLength: [3, 'Stock Cannot Exied 4 Charcter'],
        default: 1
    },
    numOfReview: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: true
        },
        name: {
            type: String, required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comments: {
            type: String,
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})




const ProductSchema = mongoose.model('Product', productSchema)
module.exports = ProductSchema