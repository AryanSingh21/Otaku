import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, productState } = useSelector((state) => state.cart);

  const costPrice = Number(
    productState.reduce((acc, item) => acc + item.price, 0)
  );
  const shippingPrice = costPrice > 200 ? 0 : 25;
  const tax = Number((0.05 * costPrice).toFixed(2));
  const total = Number(costPrice + shippingPrice + tax).toFixed(2);

  const navigate = useNavigate();
  const proceedPayment = () => {
    const data = {
      costPrice,
      shippingPrice,
      tax,
      total,
    };

    sessionStorage.setItem("OrderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <>
      <CheckoutSteps step="shipping" step2="confirmOrder" />
      <div className="container container-fluid">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b> {shippingInfo.address}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>

            <hr />
            <div className="cart-item my-1">
              <div className="row ">
                {productState.map((product) => (
                  <>
                    <div className="col-4 col-lg-2 my-2">
                      <img
                        src={product.images}
                        alt="Laptop"
                        height="65"
                        width="65"
                      />
                    </div>
                    <div className="col-5 col-lg-6 my-2">
                      <a href="#!">{product.name}</a>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0 my-2">
                      <p className="my-2">
                        1 x ${product.price} = <b>${product.price}</b>
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <hr />
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">${costPrice}</span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">${shippingPrice}</span>
              </p>
              <p>
                Tax: <span className="order-summary-values">${tax}</span>
              </p>

              <hr />

              <p>
                Total: <span className="order-summary-values">${total}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={proceedPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
