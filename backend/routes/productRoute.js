const express = require("express");
const router = express.Router();
const {getAllProducts, createProduct, updateProduct, deleteProcuct, getProductDetails, createProductReview, getProductReviews, deleteReview} = require("../controllers/productController");
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles, createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles, updateProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles, deleteProcuct);
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;