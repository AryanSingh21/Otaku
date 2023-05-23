import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useAlert } from "react-alert";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import MetaData from "../layout/MetaData";
import axios from "axios";
import { newOrder } from "../../actions/orderActions";

const Payment = () => {
  const alert = useAlert();
  const elements = useElements();
  const dispatch = useDispatch();
  const stripe = useStripe();

  const { user } = useSelector((state) => state.user);
  const { shippingInfo, productState } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error.message);
    }
  }, [alert, error]);

  const order = {
    orderItems: productState,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("OrderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.costPrice;
    order.taxPrice = orderInfo.tax;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = Number(orderInfo.total);
  }

  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    let res;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      res = await axios.post("/api/v1/payment/process", paymentData, config);
      console.log(res.data.client_Secret);

      const clientSecret = res.data.client_secret;
      console.log(clientSecret);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          //new order
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          console.log(order);
          dispatch(newOrder(order));

          navigate("/success");
        } else {
          alert.error("There is some error while processing the payment");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };
  const options = {
    style: {
      base: {
        fontSize: "16px",
      },
      invalid: {
        color: "red",
      },
    },
  };

  return (
    <>
      <CheckoutSteps step="shipping" step2="confirmOrder" step3="payment" />
      <MetaData title={"Payment"} />

      <div className="row wrapper">
        <div
          className="col-10 col-lg-5"
          style={{ backgroundColor: "white", opacity: "80%" }}
        >
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {orderInfo.total}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
