import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// create routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get routes
router.get("/get-product", getProductController);

//single product routes
router.get("/get-product/:slug", getSingleProductController);

//get photo routes
router.get("/product-photo/:pid", productPhotoController);

//delete product routes
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post('/product-filters',productFilterController)

//product count
router.get('/product-count', productCountController)

//products per page
router.get('/product-list/:page', productListController)

//search product router
router.get('/search/:keyword', searchProductController)

//similar product router
router.get('/related-product/:pid/:cid', relatedProductController)

//categorywise product router
router.get('/product-category/:slug', productCategoryController)


//payment routes
//token
router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController)

// update product routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

export default router;
