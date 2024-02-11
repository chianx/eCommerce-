const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB Id error
    if(err.name === "CastError") {
        const msg = "Resource not found. Invalid:" + err.path;
        err = new ErrorHandler(msg, 400);
    }
    // Mongoose duplicate key error
    if(err.code === 11000) {
        const msg = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(msg, 400);
    }

    // Wrong JWT Error
    if(err.name === "JsonWebTokenError") {
        const msg = "Json Web Token is invalid, Try Again";
        err = new ErrorHandler(msg, 400);
    }
    if(err.name === "TokenExpiredError") {
        const msg = "Json Web Token is expired, Try Again";
        err = new ErrorHandler(msg, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}