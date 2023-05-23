const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/order");
const Product = require("../models/products");
const ErrorHandler = require("../utils/errorHandler");

//create new order => /api/v1/order/new

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//get single order => /api/v1/order/:id

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found of this id"), 400);
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in  user order =>/api/v1/order/me
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const id = req.user._id;
  console.log(id);
  const orders = await Order.find({ user: req.user.id });
  console.log(orders);
  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders => /api/v1/admin/orders
exports.allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
//update /process orders => /api/v1/admin/order/:id
exports.updateOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order is already Delivered"), 400);
  }

  // order.orderItems.forEach(async (item) => {
  //   await updateStock(item.product, item.quantity);
  // });

  (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock = product.Stock - quantity;
  await product.save({ validateBeforeSave: false });
}
//delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found of this id"), 400);
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});