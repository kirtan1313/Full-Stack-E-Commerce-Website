const express = require('express')
const PaymentRoute = express.Router();
const { isAuth, authRole } = require('../Middleware/auth.js')
const PaymentController = require('../Controller/PaymentCon.js')


PaymentRoute.post('/payment/proccess',isAuth,PaymentController.processPayment)
PaymentRoute.get('/stripeApiKey',isAuth,PaymentController.sendStripeApiKey)




module.exports = PaymentRoute