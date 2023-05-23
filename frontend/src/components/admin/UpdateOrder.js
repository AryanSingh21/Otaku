import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, updateProduct } from "../../actions/prodcutActions";
import { orderDeatils, updateOrder } from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";

const UpdateOrder = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders } = useSelector((state) => state.allOrders);
  const { order } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updateOrder
  );
  const { shippingInfo, paymentInfo, orderItems } = order;
  const { user } = useSelector((state) => state.user);
  const orderId = params.id;

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (updateError) {
      alert.error(updateError);
    }
    if (isUpdated) {
      alert.success("Order is successfuly updated");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(orderDeatils(orderId));
  }, [dispatch, orderId, alert, updateError, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(orderId, status));
  };
  return (
    <>
      <MetaData title={"Update Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mt-5">
          <>
            <div class="row d-flex justify-content-around">
              <div class="col-12 col-lg-7 order-details">
                <h1 class="my-5">Order #{order._id}</h1>

                <h4 class="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                </p>
                <p class="mb-4">
                  <b>Address:</b>
                  {shippingInfo && shippingInfo.address}
                </p>
                <p>
                  <b>Amount:</b> ${order.totalPrice}
                </p>

                <hr />

                <h4 class="my-4">Payment</h4>
                <p class="greenColor">
                  <b>PAID</b>
                </p>

                <h4 class="my-4">Stripe ID</h4>
                <p class="greenColor">
                  <b>{paymentInfo && paymentInfo.id}</b>
                </p>

                <h4 class="my-4">Order Status:</h4>
                {order.orderStatus === "Delivered" ? (
                  <p class="greenColor">
                    <b>{order.orderStatus}</b>
                  </p>
                ) : (
                  <p class="redColor">
                    <b>{order.orderStatus}</b>
                  </p>
                )}

                <h4 class="my-4">Order Items:</h4>

                <hr />
                {orderItems &&
                  orderItems.map((item) => (
                    <div className="cart-item my-1" key={order._id}>
                      <div className="row my-5">
                        <div className="col-4 col-lg-2">
                          <img src="" alt="Laptop" height="45" width="65" />
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

              <div class="col-12 col-lg-3 mt-5">
                <h4 class="my-4">Status</h4>

                <div class="form-group">
                  <select
                    class="form-control"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <button
                  class="btn btn-primary btn-block"
                  onClick={submitHandler}
                >
                  Update Status
                </button>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default UpdateOrder;
