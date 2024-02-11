const Order = require("../models/orderModel")
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Create new order 
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(200).json({success: true, order});
})

// Get single order 
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populte("user", "name email");
    if(!order) {
        return next(new ErrorHandler("Order not found with this Id", 400));
    }
    res.status(200).json({success: true, order});
})

// Get order -- logged in users
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({user : req.user._id});
    res.status(200).json({success: true, orders});
});

// Get all orders -- admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });
    res.status(200).json({success: true, orders, totalAmount});
});

// Update order status -- admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return next(new ErrorHandler("Order not found with this ID", 400));
    }
    if(order.orderStatus ===  "Delivered") {
        return next(new ErrorHandler("You have already delivered this product", 400));
    }
    order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
    })
    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({success: true});
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock = product.Stock - quantity;
    await product.save({validateBeforeSave:false});
}

// Delete order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.prams.id);
    if(!order) {
        return next(new ErrorHandler("Order not found with this ID", 400));
    }
    await order.remove();
    res.status(200).json({success: true});
});
