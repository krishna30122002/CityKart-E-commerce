import express from "express";
import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router()

// routing
// Register || Method POST
router.post('/register', registerController)

// Register || Method POST
router.post('/login', loginController)

//forgot password || Method POST
router.post('/forgot-password', forgotPasswordController)

// test routes
router.get('/test', requireSignIn, isAdmin,testController)

//protected User route auth
router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})

//protected Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})

//update profile router
router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get('/orders', requireSignIn, getOrdersController)

//get all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

//get all orders
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

export default router;