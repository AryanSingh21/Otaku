import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { adminOrders, deleteOrder } from "../../actions/orderActions";
import Sidebar from "./Sidebar";

const OrdersList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders, totalAmount } = useSelector(
    (state) => state.allOrders
  );
  const navigate = useNavigate();
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.updateOrder
  );
  useEffect(() => {
    if (deleteError) {
      alert.error(deleteError);
    }
    if (error) {
      alert.error(error);
    }
    if (isDeleted) {
      alert.success("Order is successfuly deleted");
    }
    dispatch(adminOrders());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const deleteHandler = (id) => {
    dispatch(deleteOrder(id));
    navigate("/admin/orders");
  };
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <>
            <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger ml-2 "
              onClick={() => deleteHandler(order._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };
  return (
    <Fragment>
      <MetaData title={"All Orders"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 mt-5">
          <h1 className="my-5">All Orders</h1>

          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders()}
              className="px-3"
              bordered
              striped
              hover
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
