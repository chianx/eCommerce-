const express = require("express");
const {deleteUser, updateUserRole, registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser} = require("../controllers/userController");
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

// Authentication Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/upadte").put(isAuthenticatedUser, updatePassword);
router.route("/logout").get(logout);

// User Detail Routes
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles, getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles, getSingleUser);
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles, updateUserRole);
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles, deleteUser);

module.exports = router;