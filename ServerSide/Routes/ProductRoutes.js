const express = require('express')
const ProductRoutes = express.Router()
const ProductController = require('../Controller/ProductCon.js')
const { isAuth, authRole } = require('../Middleware/auth.js')

ProductRoutes.get('/product', ProductController.getAllProdct)
ProductRoutes.get('/product/:id', ProductController.GetSingleProdctsDetails)
ProductRoutes.get('/reviews', ProductController.GetAllReview)


ProductRoutes.post('/admin/product', isAuth, authRole('admin'), ProductController.Createproduct)

ProductRoutes.put('/product/review',isAuth, ProductController.productRating)
ProductRoutes.put('/admin/product/:id', isAuth, authRole('admin'), ProductController.UpdateProducts)

ProductRoutes.delete('/admin/product/:id', isAuth, authRole('admin'), ProductController.DeleteProducts)
ProductRoutes.delete('/reviews', isAuth,  ProductController.DeleteReview)


module.exports = ProductRoutes