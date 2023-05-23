import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { orderDeatils } from "../../actions/orderActions";

const OrderDetails = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { shippingInfo, productState } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const { orderItems } = order;

  const params = useParams();
  useEffect(() => {
    dispatch(orderDeatils(params.id));

    if (error) {
      alert.error(error);
    }
  }, [dispatch, params, error, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Order Details"} />
          <div className="container container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8 mt-5 order-details">
                <h1 className="my-5">Order #{order._id}</h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p>
                  <b>Phone:</b> 111 111 1111
                </p>
                <p className="mb-4">
                  <b>Address:</b> {shippingInfo.address}
                </p>
                <p>
                  <b>Amount:</b> ${order.totalPrice}
                </p>

                <hr />

                <h4 className="my-4">Payment</h4>
                <p className="greenColor">
                  <b>PAID</b>
                </p>

                <h4 className="my-4">Order Status:</h4>
                <p className="greenColor">
                  <b>Delivered</b>
                </p>

                <h4 className="my-4">Order Items:</h4>

                <hr />
                {orderItems &&
                  orderItems.map((item) => (
                    <div className="cart-item my-1" key={order._id}>
                      <div className="row my-5">
                        <div className="col-4 col-lg-2">
                          <img
                            src={order.images}
                            alt="Laptop"
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <a href="/#">{item.name}</a>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>2 Piece(s)</p>
                        </div>
                      </div>
                    </div>
                  ))}
                <hr />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
