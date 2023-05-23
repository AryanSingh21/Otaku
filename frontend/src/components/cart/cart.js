import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const { loading, error, productState } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const removeItem = (id) => {
    dispatch(removeProduct(id));
  };

  const navigate = useNavigate();
  const submitHandler = () => {
    console.log(productState);
    navigate("/checkout");
  };
  return (
    <>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart:
          {isAuthenticated ? <b>{productState.length}</b> : <b> 0 </b>}items;
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {isAuthenticated ? (
              <>
                {productState.map((product) => (
                  <>
                    <hr />
                    <div className="cart-item" key={product._id}>
                      <div className="row align-items-center">
                        <div className="col-4 col-lg-3">
                          <img
                            src={product.images}
                            alt={product.name}
                            height="140"
                            width="115"
                          />
                        </div>

                        <div className="col-5 col-lg-3 ">
                          <a href="#/" style={{ fontSize: "22px" }}>
                            {product.name}
                          </a>
                        </div>

                        <div className="col-4 col-lg-2 mt-3 ">
                          <p id="card_item_price">${product.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus">-</span>
                            <input
                              type="number"
                              className="form-control count d-inline"
                              value="1"
                              readOnly
                            />

                            <span className="btn btn-primary plus">+</span>
                          </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                            onClick={() => removeItem(product._id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
              </>
            ) : (
              <div></div>
            )}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {isAuthenticated ? (
                    <>{productState.reduce((acc, item) => acc + 1, 0)}</>
                  ) : (
                    <>0</>
                  )}
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">
                  $
                  {isAuthenticated ? (
                    <>
                      {productState.reduce(
                        (acc, item) => acc + Math.floor(item.price),
                        0
                      )}
                    </>
                  ) : (
                    <>0</>
                  )}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={submitHandler}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
