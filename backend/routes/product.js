const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productControllers");
const { authorizedRoles, isAuthenticatedUser } = require("../middleware/auth");

router.route("/products").get(getProducts);

// router
//   .route("/admin/product/new")

//   .post(isAuthenticatedUser, authorizedRoles("admin"), newProduct);

router
  .route("/admin/new/product")
  .post(isAuthenticatedUser, authorizedRoles("admin"), newProduct);
router.route("/products/:id").get(getSingleProduct);

router.route("/admin/products").get(getAdminProducts);

router.route("/admin/products/:id").put(isAuthenticatedUser, updateProduct);

router.route("/admin/products/new").post(isAuthenticatedUser, newProduct);
router
  .route("/admin/product/delete/:id")
  .delete(isAuthenticatedUser, deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
