const OrderSchema = require('../Model/OrderModel')
const ProductSchema = require('../Model/ProductModel')
const mongoose = require('mongoose')

// Create A New Error
exports.CreateOrder = async (req, res) => {
    try {
        
        console.log("shiping Info",req.body);
        
        
        const { shippingInfo, orderItmes, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

        const createOrder = await OrderSchema.create(
            {
                shippingInfo,
                orderItmes,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                paidAt:
                    Date.now(),
                user: req.user._id
            }
        )

        res.status(200).json({ success: true, message: 'Create A Order SuccessFully...', createOrder });

    } catch (error) {
        console.error("Order Create Error:", error)
        res.status(500).json({ success: false, message: "Create A Order Error...", error });
    }
}


// Get Single Order
exports.getSingleOrder = async (req, res) => {
    try {
        const order = await OrderSchema.findById(req.params.id).populate("user", "name email");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: 'Get Single Order Successfully...', order });

    } catch (error) {
        console.error("Get Order Error:", error);
        res.status(500).json({ success: false, message: "Get Single Order Error...", error });
    }
}


// Get Loging User Find Order
exports.myOrder = async (req, res) => {
    try {

        const orders = await OrderSchema.find({ user: req.user._id })

        if (!orders) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: 'Find My All Order SuccessFully...', orders });

    } catch (error) {
        res.status(500).json({ success: false, message: "Find My All Order Error...", error });
    }
}


// Get All Order --Admin
exports.getAllOrder = async (req, res) => {
    try {
        const order = await OrderSchema.find()

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        let totalAmount = 0;

        order.forEach((order) => {
            totalAmount += order.totalPrice
        })

        res.status(200).json({ success: true, message: 'Get All Order Successfully...', totalAmount, order });

    } catch (error) {
        console.error("Get Order Error:", error);
        res.status(500).json({ success: false, message: "Get All Order Error...", error });
    }
}


exports.updateOrder = async (req, res) => {
    try {

        const order = await OrderSchema.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.orderStatus === "Delivered") {
            return res.status(400).json({ success: false, message: "You Have Already Delivered This Order" });
        }

        for (const item of order.orderItmes) {
            await updateStock(item.productId, item.quantity);
        }

        order.orderStatus = req.body.status;

        if (req.body.status === "Delivered") {
            order.deliverAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: 'Update Order Successfully...',
            order
        });

    } catch (error) {
        console.error("Update Order Error:", error);
        res.status(500).json({
            success: false,
            message: "Update Order Error...",
            error: error.message
        });
    }
}

async function updateStock(id, quantity) {
    const Product = await ProductSchema.findById(id);

    if (!Product) {
        throw new Error("Product not found");
    }

    Product.stock -= quantity;

    await Product.save({ validateBeforeSave: false });
}



// Delete Order --Admin
exports.deleteOrder = async (req, res) => {
    try {
        const order = await OrderSchema.findByIdAndDelete(req.params.id)

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: 'Delete Order Successfully...', order });

    } catch (error) {
        console.error("Get Order Error:", error);
        res.status(500).json({ success: false, message: "Delete Order Error...", error });
    }
}