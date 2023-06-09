import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 my-3">
      <div
        className="card p-3 rounded shadow-lg"
        style={{ backgroundColor: "" }}
      >
        <img
          alt="productImage"
          className="card-img-top mx-auto"
          src={product.images}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${product.price}</p>

          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block"
            style={{
              backgroundColor: "#eea47fff",
            }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
