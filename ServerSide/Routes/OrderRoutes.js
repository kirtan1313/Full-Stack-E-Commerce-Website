const express = require('express')
const OrderRoutes = express.Router();
const OrderController = require('../Controller/OrderCon')
const { isAuth, authRole } = require('../Middleware/auth.js')

OrderRoutes.post('/order', isAuth, OrderController.CreateOrder)
OrderRoutes.get('/order/:id', isAuth, OrderController.getSingleOrder)
OrderRoutes.get('/order', isAuth, OrderController.myOrder)

OrderRoutes.get('/admin/order', isAuth,authRole('admin'), OrderController.getAllOrder)
OrderRoutes.put('/admin/order/:id', isAuth,authRole('admin'), OrderController.updateOrder)
OrderRoutes.delete('/order/:id', isAuth,authRole('admin'), OrderController.deleteOrder)


module.exports = OrderRoutes

