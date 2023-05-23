import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, newReview } from "../../actions/prodcutActions";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../../actions/userActions";
import { cartAdd } from "../../actions/cartActions";
import ListReview from "../review/ListReview";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //import from storejs

  const params = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  //storejs

  const incValue = () => {
    console.log(product);
    const count = document.querySelector(".count");

    if (quantity >= product.Stock) {
      return;
    }
    setQuantity(count.valueAsNumber + 1);
  };

  const addToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(cartAdd(params.id));
      alert.success("Product added to cart");
    }
  };
  const decValue = () => {
    const count = document.querySelector(".count");

    if (count.value <= 1) {
      return;
    }
    setQuantity(count.valueAsNumber - 1);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (reviewError) {
      alert.error(reviewError);
    }
    if (success) {
      alert.success("Review Submitted");
    }

    dispatch(getProductDetails(params.id));
  }, [dispatch, alert, error, params.id, reviewError, success]);

  //submitReview
  const submitReview = () => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", params.id);

    dispatch(newReview(formData));
  };

  //reviewHandler is a must and a whole lot of vanilla js understand this quite welll
  const reviewHandler = () => {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });
    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");
            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }
        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }
        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container container-fluid">
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <img src={product.images} alt="sdf" height="600" width="500" />
            </div>

            <div
              className="col-12 col-lg-5 mt-5"
              // style={{ backgroundColor: "white", opacity: "80%" }}
            >
              <h1>{product.name}</h1>
              <p id="product_id">{product.id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews})</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decValue}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={incValue}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                onClick={addToCart}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span id="stock_status">
                  {product.stock > 0 ? "In stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>
              {isAuthenticated ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={reviewHandler}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5">
                  Login to Submit review
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={submitReview}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {product.review && product.review.length > 0 && (
            <ListReview reviews={product.review} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
