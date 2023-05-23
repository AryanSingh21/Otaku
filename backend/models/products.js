const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 char"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "product name cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  // images: [
  //   {
  //     public_id: {
  //       type: String,
  //       // required: true,
  //     },
  //     url: {
  //       type: String,
  //       // required: true,
  //     },
  //   },
  // ],
  images: {
    type: String,
    default: "",
    // required: true,
  },
  category: {
    type: String,
    required: [true, "Please specify the category"],
    enum: {
      values: [
        // "Electronics",
        // "Cameras",
        // "Laptops",
        // "Accessories",
        // "Headphones",
        // "Food",
        // "Books",
        // "Clothes",
        // "Beauty",
        // "Sports",
        // "Outdoor",
        // "Home",
        "Kodomo",
        "Josei",
        "Seijin/Ero",
        "Action",
        "Rom-Com",
        "Thriller",
        "Adventure",
        "Comics adaptations",
        "Historical / Historical Fiction / Alternative Histories",
        "Horror",
        "Romance",
        "Shōnen-ai",
        "Shōjo-ai",
      ],

      message: "pLease select correct category for product",
    },
  },
  seller: {
    type: String,
    required: [true, "Please specify the seller"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  review: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
