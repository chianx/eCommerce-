const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) {
        return next(new ErrorHandler("Please Login to access this route", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})

exports.authorizeRoles = catchAsyncErrors(async (req, res, next) => {
    if(!(req.user.role === "admin")) {
        return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this route`, 403));
    }
    next();
})