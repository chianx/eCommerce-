const User = require("../models/userModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Registration of user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    console.log("hello");
    const {name, email, password} = req.body;
    const user = await User.create({name, email, password,
        avatar: {
            public_id: "sample id",
            url : "prodile pic url"
        } 
    });
    sendToken(user, 201, res);
})

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;
    // checking if user has given email and pass both
    if(!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid Email", 401));
    }
    const passwordMatch = await user.comparePassword(password);
    if(!passwordMatch) {
        return next(new ErrorHandler("Invalid Email or password", 401));
    }
    
    sendToken(user, 200, res);
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires:new Date(Date.now()), 
        httpOnly:true
    })
    res.status(200).json({success:true, message:"Logged out"});
})

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email : req.body.email});
    if(!user) {
        return next(new ErrorHandler("No user found", 404));
    }

    // get reset password token
    const resetToken = await user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/reset/${resetToken}`;
    const msg = `Your password reset link is :- \n\n${resetPasswordUrl}. \n\nIf you have not requested this email then please ignore it.`;
    try {
        await sendEmail({
            email:user.email,
            subject: "Ecommerce Password Recovery",
            msg,
        });
        res.status(200).json({resetToken, success:200, message: "Email sent to :" + user.email});
    }catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500));
    }
})

// Reset Pssword
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt : Date.now()}
    })

    if(!user) {
        return next(new ErrorHandler("Reset Password Token in invalid or has been expired", 400));
    }

    if(req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
})

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({success:200, user});
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400));
    }
    if(req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})

// Update User profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new : true,
        runValidators:true,
        useFindAndModify:true,
    })
    res.status(200).json({success: true});
})

// get all users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({success: true, users});
})

// get single user detail (for admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find(req.params.id);
    if(!user) {
        return next(new ErrorHandler("User does not exixts", 404));
    }
    res.status(200).json({success:true, user});
})

// update user role (admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new : true,
        runValidators:true,
        useFindAndModify:true,
    })
    res.status(200).json({success: true});
});

// delete user (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler("User does not exixts", 404));
    }
    await user.remove();
    res.status(200).json({success: true});
});