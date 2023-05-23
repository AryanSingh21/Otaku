const Product = require("../models/products");
const ApiFeature = require("../utils/apiFearures");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
//Create new product => /api/v1/Product/new

exports.newProduct = async (req, res, next) => {
  // req.body.user = req.user.id;
  // console.log(req.body.user);
  console.log(req.body);
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};
//get single product => /api/v1/:id

exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

//get all products => /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productsCount,
    resPerPage,
    products,
  });
});

//get all admin products -> /api/v1/admin/products

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//update product => /api/v1/admin/products/:id

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not Found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

//Delete product => /api/v1/admin/prdouct/:id

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Prdouct is deleted",
  });
};

// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.review.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.review.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.review.push(review);
    product.numOfReviews = product.review.length;
  }

  product.ratings =
    product.review.reduce((acc, item) => item.rating + acc, 0) /
    product.review.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
//get product reviews => /api/v1/reviews

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.review,
  });
});

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  // console.log(product);
  // console.log(req.query.id);
  // console.log(product.review[0]._id.toString());
  // product.review.filter((review) => console.log(review._id.toString()));
  const reviews = product.review.filter(
    (review) => review._id.toString() !== req.query.id
  );

  const numOfReviews = reviews.length;

  // console.log(product.review);

  const ratings =
    product.review.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
