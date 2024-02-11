const express = require("express");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/order/me").get(isAuthenticatedUser, myOrders);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles, getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles, updateOrder);
router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles, deleteOrder);

module.exports = router;
