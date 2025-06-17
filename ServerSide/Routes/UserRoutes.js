const express = require('express')
const userRoutes = express.Router();
const UserController = require('../Controller/UserCon.js')
const { isAuth, authRole } = require('../Middleware/auth.js');
const upload = require('../Multer/multer.js');


userRoutes.post('/register',upload.single('avatar'),UserController.registerUser)
userRoutes.post('/login',UserController.loginUser)
userRoutes.post('/forgetPassword',UserController.forgetPassword)

userRoutes.get('/logout',UserController.logOutUser)
userRoutes.get('/getuser',isAuth,UserController.getUserDetail)
userRoutes.get('/admin/user',isAuth,authRole('admin'),UserController.getAllUserDetail)
userRoutes.get('/admin/user/:id',isAuth,authRole('admin'),UserController.getSingleUserDetail)
userRoutes.put('/admin/user/:id',isAuth,authRole('admin'),UserController.UpdateUserRole)

userRoutes.delete('/admin/user/:id',isAuth,authRole('admin'),UserController.DeleteUser)

userRoutes.put('/reset/:token',UserController.resetPasswordToken)
userRoutes.put('/updateUserPassword',isAuth,UserController.UpdateUserPassword)
userRoutes.put('/updateuser',isAuth,upload.single("avatar"),UserController.updateProfile)



module.exports = userRoutes;